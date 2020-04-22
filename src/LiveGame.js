import React from 'react';
import playingCards from './playingCards';

import base from './base';
import { firebaseApp } from './base';

const shortid = require('shortid');

///////////////////////////////////////////////////////////////////////

class LiveGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               gameID: '',
               northName: '',
               southName: '',
               eastName: '',
               westName: '',
               northCards: [],
               southCards: [],
               eastCards: [],
               westCards: [],
               loggedIn: '',
          }

          console.log(playingCards);

     }

     // Helper Function: shuffle the deck to start with, source: https://www.jstips.co/en/javascript/shuffle-an-array/
     shuffle = (arr) => {
         var i,
             j,
             temp;
         for (i = arr.length - 1; i > 0; i--) {
             j = Math.floor(Math.random() * (i + 1));
             temp = arr[i];
             arr[i] = arr[j];
             arr[j] = temp;
         }
         return arr;
     };


     // Helper Function: create the display from an array of objects (cards)
     displayCards = (cards) => {

          // order the cards by suit then value (high to low)
          cards.sort((a, b) => (a.suit < b.suit) ? 1 : (a.suit === b.suit) ? ((a.value < b.value) ? 1 : -1) : -1 )

          const cardsToDisplay = cards.map((card) =>
            <li key={shortid.generate()}>
              {card.name}
            </li>
          );
          return cardsToDisplay;
     }


     dealNewHand = () => {

          const newDeck = [...playingCards];
          console.log(newDeck);

          // Deal the cards to each player!
          let cardsToDeal = this.shuffle(newDeck);

          let northCards = newDeck.splice(0,13);
          let southCards = newDeck.splice(0,13);
          let eastCards = newDeck.splice(0,13);
          let westCards = newDeck.splice(0,13);

          this.setState({
               northCards: northCards,
               southCards: southCards,
               eastCards: eastCards,
               westCards: westCards
          });
     }



     componentDidMount() {

          //console.log(this.props.location);

          console.log("componentDidMount");
          let currentGameID = '123';
          // let playerName = 'TESTING';
          let playerName = '';
          let position = {};
          position.value = 'north';

          if( this.props.location.data !== undefined ) {
               currentGameID = parseInt(this.props.location.data.gameID);
               // playerName = this.props.location.data.playerName;
               playerName = this.props.location.data.playerName;
               console.log(this.props.location.data.playerName);
               console.log(this.props.location.data.position);
               position.value = this.props.location.data.position;
          }

          let northName = this.state.northName;
          let southName = this.state.southName;
          let eastName = this.state.eastName;
          let westName = this.state.westName;

          console.log(position.value);
          console.log(playerName);
          console.log(northName);

          if( position.value === 'north' ) { console.log("position.value === 'north'"); northName = playerName; }
          if( position.value === 'south' ) { console.log("position.value === 'south'"); southName = playerName; }
          if( position.value === 'east' ) { eastName = playerName; }
          if( position.value === 'west' ) { westName = playerName; }

          console.log(position.value);
          console.log(playerName);

          // setup the card table
          this.setState({
               gameID: currentGameID,
               loggedIn: playerName,
               northName: northName,
               southName: southName,
               eastName: eastName,
               westName: westName,
          });


            // Firebase Connections

            base.syncState(`allGames/${currentGameID}/northCards`, {
              context: this,
              state: 'northCards',
              asArray: true
            });

            base.syncState(`allGames/${currentGameID}/southCards`, {
              context: this,
              state: 'southCards',
              asArray: true
            });

            base.syncState(`allGames/${currentGameID}/eastCards`, {
              context: this,
              state: 'eastCards',
              asArray: true
            });

            base.syncState(`allGames/${currentGameID}/westCards`, {
              context: this,
              state: 'westCards',
              asArray: true
            });

            // base.syncState(`allGames/${currentGameID}/northName`, {
            //   context: this,
            //   state: 'northName',
            //   asArray: true
            // });

            base.fetch(`allGames/${currentGameID}/northName`, {
              context: this,
              asArray: false,
              then(data){
                   this.setState({
                       northName: northName,
                  });
              }
            });

            base.fetch(`allGames/${currentGameID}/southName`, {
              context: this,
              asArray: false,
              then(data){
                   this.setState({
                       southName: southName,
                  });
              }
            });

     }



     render() {

          console.log("NORTH: " + JSON.stringify(this.state.northCards));
          console.log("SOUTH: " + JSON.stringify(this.state.southCards));
          console.log("EAST: " + JSON.stringify(this.state.eastCards));
          console.log("WEST: " + JSON.stringify(this.state.westCards));

          console.log(this.state.loggedIn);
          console.log(`North: ${this.state.northName}`);
          console.log(`South: ${this.state.southName}`);
          console.log(`East: ${this.state.eastName}`);
          console.log(`West: ${this.state.westName}`);


          // see which player is logged in and show only their cards
          let northCardsDisplay = null;
          let southCardsDisplay = null;
          let eastCardsDisplay = null;
          let westCardsDisplay = null;

          let dealNewHandButton = null;

          // Check if game already exists
          console.log(this.state.gameID);
          console.log(this.props.allGames);
          const currentGamesByID = Object.keys(this.props.allGames);
          console.log(JSON.stringify(currentGamesByID));


          if( this.state.loggedIn === this.state.northName || this.state.loggedIn === 'clb' ) {
               northCardsDisplay = (
                    <div className="single-hand">
                         <h3>North - {this.state.northName}</h3>
                         <p>{this.displayCards(this.state.northCards)}</p>
                    </div>
               );
               dealNewHandButton = (<button onClick={this.dealNewHand}>Deal New Hand</button>);
          }

          if( this.state.loggedIn === this.state.southName || this.state.loggedIn === 'clb' ) {
               southCardsDisplay = (
                    <div className="single-hand">
                         <h3>South - {this.state.southName}</h3>
                         <p>{this.displayCards(this.state.southCards)}</p>
                    </div>
               );
          }

          if( this.state.loggedIn === this.state.eastName || this.state.loggedIn === 'clb' ) {
               eastCardsDisplay = (
                    <div className="single-hand">
                         <h3>East - {this.state.eastName}</h3>
                         <p>{this.displayCards(this.state.eastCards)}</p>
                    </div>
               );
          }

          if( this.state.loggedIn === this.state.westName || this.state.loggedIn === 'clb' ) {
               westCardsDisplay = (
                    <div className="single-hand">
                         <h3>West - {this.state.westName}</h3>
                         <p>{this.displayCards(this.state.westCards)}</p>
                    </div>
               );
          }

          return (
               <>
               <h2>Let's Play! Game ID#: {this.state.gameID}</h2>
               {dealNewHandButton}
               <div className="players">
                    {`North: ${this.state.northName}`}
                    {`South: ${this.state.southName}`}
                    {`East: ${this.state.eastName}`}
                    {`West: ${this.state.westName}`}
               </div>
               <div className="hand-area">
                    {northCardsDisplay}
                    {southCardsDisplay}
                    {eastCardsDisplay}
                    {westCardsDisplay}
               </div>
               </>
               );
     }

}


export default LiveGame;
