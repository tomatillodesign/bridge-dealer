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
               southName: this.props.southName,
               eastName: this.props.eastName,
               westName: this.props.westName,
               loggedIn: this.props.loggedIn,
               northCards: [],
               southCards: [],
               eastCards: [],
               westCards: [],
               allHands: [],
               timestampLastDeal: null
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

          // add the previous hand into allHands for historical reference
          let previousHand = [];
          previousHand['northCards'] = this.state.northCards;
          previousHand['southCards'] = this.state.southCards;
          previousHand['eastCards'] = this.state.eastCards;
          previousHand['westCards'] = this.state.westCards;
          this.setState(prevState => ({
               allHands: [...prevState.allHands, previousHand],
          }));

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
               timestampLastDeal: Date.now()
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

            base.syncState(`allGames/${currentGameID}/allHands`, {
              context: this,
              state: 'allHands',
              asArray: true
            });

            base.syncState(`allGames/${currentGameID}/timestampLastDeal`, {
              context: this,
              state: 'timestampLastDeal',
              asArray: false
            });

            /// Fetch all of the player names ///////////////////////////////
            base.fetch(`allGames/${currentGameID}`, {
             context: this,
             asArray: false
           }).then(data => {

             console.log(data);

             this.setState({
                  northName: data.northName,
                  southName: data.southName,
                  eastName: data.eastName,
                  westName: data.westName
             });

           }).catch(error => {
             //handle error
        });


        // listen to the gameID endpoint to see if new players are added - SOUTHNAME
        base.listenTo(`allGames/${currentGameID}/southName`, {
         context: this,
         asArray: false,
         then(data){
           console.log("UPDATED DATA ///////////////////////////////////////////");
           console.log(data);
            this.setState({ southName: data });
         }
       })

       // listen to the gameID endpoint to see if new players are added - SOUTHNAME
       base.listenTo(`allGames/${currentGameID}/eastName`, {
       context: this,
       asArray: false,
       then(data){
          console.log("UPDATED DATA ///////////////////////////////////////////");
          console.log(data);
          this.setState({ eastName: data });
       }
     })

        // listen to the gameID endpoint to see if new players are added - WESTNAME
        base.listenTo(`allGames/${currentGameID}/westName`, {
         context: this,
         asArray: false,
         then(data){
           console.log("UPDATED DATA ///////////////////////////////////////////");
           console.log(data);
            this.setState({ westName: data });
         }
       })


     }



     render() {

          // console.log("NORTH: " + JSON.stringify(this.state.northCards));
          // console.log("SOUTH: " + JSON.stringify(this.state.southCards));
          // console.log("EAST: " + JSON.stringify(this.state.eastCards));
          // console.log("WEST: " + JSON.stringify(this.state.westCards));
          //
          // console.log(this.props.loggedIn);
          // console.log(`North: ${this.state.northName}`);
          // console.log(`South: ${this.state.southName}`);
          // console.log(`East: ${this.state.eastName}`);
          // console.log(`West: ${this.state.westName}`);


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

               if( this.state.northName && this.state.southName && this.state.eastName && this.state.westName ) {
                    dealNewHandButton = (<button onClick={this.dealNewHand}>Deal New Hand</button>);
               }
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
