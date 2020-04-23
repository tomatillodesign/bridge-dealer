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
               northName: this.props.northName,
               northCards: [],
               southCards: [],
               eastCards: [],
               westCards: [],
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
               westCards: westCards,
          });
     }



     componentDidMount() {

          console.log("componentDidMount LiveGame");
          const currentGameID = this.props.gameID;

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

            base.syncState(`allGames/${currentGameID}/northName`, {
              context: this,
              state: 'northName',
              asArray: false
            });

     }



     render() {

          console.log("NORTH: " + JSON.stringify(this.state.northCards));
          console.log("SOUTH: " + JSON.stringify(this.state.southCards));
          console.log("EAST: " + JSON.stringify(this.state.eastCards));
          console.log("WEST: " + JSON.stringify(this.state.westCards));

          console.log(this.props.loggedIn);
          console.log(`North: ${this.props.northName}`);
          console.log(`South: ${this.props.southName}`);
          console.log(`East: ${this.props.eastName}`);
          console.log(`West: ${this.props.westName}`);


          // see which player is logged in and show only their cards
          let northCardsDisplay = null;
          let southCardsDisplay = null;
          let eastCardsDisplay = null;
          let westCardsDisplay = null;

          let dealNewHandButton = null;

          if( this.props.loggedIn === this.state.northName || this.state.loggedIn === 'clb' ) {
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

          console.log(this.state.northName);

          return (
               <>
               <h2>Let's Play! Game ID#: {this.props.gameID}</h2>
               {dealNewHandButton}
               <div className="players">
                    {`North: ${this.props.northName}`}
                    {`South: ${this.props.southName}`}
                    {`East: ${this.props.eastName}`}
                    {`West: ${this.props.westName}`}
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
