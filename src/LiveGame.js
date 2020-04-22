import React from 'react';
import playingCards from './playingCards';

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

          let currentGameID = 123;
          let playerName = 'CLB';
          if( this.props.location.data !== undefined ) {
               currentGameID = this.props.location.data.gameID;
               playerName = this.props.location.data.playerName;
          }

          // setup the card table
          this.setState({
               gameID: currentGameID,
               northName: playerName,
               loggedIn: playerName,
          });

     }



     render() {

          console.log("NORTH: " + JSON.stringify(this.state.northCards));
          console.log("SOUTH: " + JSON.stringify(this.state.southCards));
          console.log("EAST: " + JSON.stringify(this.state.eastCards));
          console.log("WEST: " + JSON.stringify(this.state.westCards));

          // see which player is logged in and show only their cards
          let northCardsDisplay = null;
          let southCardsDisplay = null;
          let eastCardsDisplay = null;
          let westCardsDisplay = null;

          if( this.state.loggedIn === this.state.northName || this.state.loggedIn === 'clb' ) {
               northCardsDisplay = (
                    <div className="single-hand">
                         <h3>North - {this.state.northName}</h3>
                         <p>{this.displayCards(this.state.northCards)}</p>
                    </div>
               );
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
               <button onClick={this.dealNewHand}>Deal New Hand</button>
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
