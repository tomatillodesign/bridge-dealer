import React from 'react';
import playingCards from './playingCards';

import base from './base';
import { firebaseApp } from './base';
import { Beforeunload } from 'react-beforeunload';
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
               timestampLastDeal: 0
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



     convert = ( unixtimestamp ) => {

     var date = new Date(unixtimestamp);

      // Months array
      var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      // Year
      var year = date.getFullYear();

      // Month
      var month = months_arr[date.getMonth()];

      // Day
      var day = date.getDate();

      // Hours
      var hours = date.getHours();

      // Minutes
      var minutes = "0" + date.getMinutes();

      // Seconds
      var seconds = "0" + date.getSeconds();

      // Display date time in MM-dd-yyyy h:m:s format
      var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      return convdataTime;

}


     // Helper Function: create the display from an array of objects (cards)
     displayCards = (cards) => {

          // order the cards by suit then value (high to low)
          cards.sort((a, b) => (a.suit < b.suit) ? 1 : (a.suit === b.suit) ? ((a.value < b.value) ? 1 : -1) : -1 )

          const cardsToDisplay = cards.map((card, index) =>
            <li key={shortid.generate()} className="card" id={card.abbr + '-' + card.suit} data-index={index} data-suit={card.suit} data-value={card.value} data-symbol={card.symbol} data-abbr={card.abbr}>
              <div className="card-abbr">{card.abbr}</div>
              <div className="card-name">{card.name}</div>
              <div className="suit-symbol">{card.symbol}</div>
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
          //console.log(newDeck);

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

             //console.log(data);

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
           //console.log("UPDATED southName DATA ///////////////////////////////////////////");
           //console.log(data);
            this.setState({ southName: data });
         }
       })

       // listen to the gameID endpoint to see if new players are added - SOUTHNAME
       base.listenTo(`allGames/${currentGameID}/eastName`, {
       context: this,
       asArray: false,
       then(data){
          //console.log("UPDATED eastName DATA ///////////////////////////////////////////");
          //console.log(data);
          this.setState({ eastName: data });
       }
     })

        // listen to the gameID endpoint to see if new players are added - WESTNAME
        base.listenTo(`allGames/${currentGameID}/westName`, {
         context: this,
         asArray: false,
         then(data){
           //console.log("UPDATED westName DATA ///////////////////////////////////////////");
           //console.log(data);
            this.setState({ westName: data });
         }
       })


     }


     isEmpty = (obj) => {
          if( obj !== undefined ) {
               // return Object.keys(obj).length === 0;
               return JSON.stringify(obj) === '{}';
          } else {
               return false;
          }
     }


     render() {


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
                         <div className="cards-display-area">{this.displayCards(this.state.northCards)}</div>
                    </div>
               );

               if( this.state.northName && this.state.southName && this.state.eastName && this.state.westName ) {
                    dealNewHandButton = (<div className="deal-new-hand-action-area"><button onClick={this.dealNewHand}>Deal New Hand 👍</button></div>);
               }
          }

          if( this.state.loggedIn === this.state.southName || this.state.loggedIn === 'clb' ) {
               southCardsDisplay = (
                    <div className="single-hand">
                         <h3>South - {this.state.southName}</h3>
                         <div className="cards-display-area">{this.displayCards(this.state.southCards)}</div>
                    </div>
               );
          }

          if( this.state.loggedIn === this.state.eastName || this.state.loggedIn === 'clb' ) {
               eastCardsDisplay = (
                    <div className="single-hand">
                         <h3>East - {this.state.eastName}</h3>
                         <div className="cards-display-area">{this.displayCards(this.state.eastCards)}</div>
                    </div>
               );
          }

          if( this.state.loggedIn === this.state.westName || this.state.loggedIn === 'clb' ) {
               westCardsDisplay = (
                    <div className="single-hand">
                         <h3>West - {this.state.westName}</h3>
                         <div className="cards-display-area">{this.displayCards(this.state.westCards)}</div>
                    </div>
               );
          }

          let northNameToPublish = this.state.northName || (<span className="waiting-on-player">Waiting...</span>);
          let southNameToPublish = this.state.southName || (<span className="waiting-on-player">Waiting...</span>);
          let eastNameToPublish = this.state.eastName || (<span className="waiting-on-player">Waiting...</span>);
          let westNameToPublish = this.state.westName || (<span className="waiting-on-player">Waiting...</span>);

          if( this.state.southName === {} ) { southNameToPublish = (<span className="waiting-on-player">Waiting...</span>); }
          if( this.state.eastName === {} ) { eastNameToPublish = (<span className="waiting-on-player">Waiting...</span>); }
          if( this.state.westName === {} ) { westNameToPublish = (<span className="waiting-on-player">Waiting...</span>); }

          if( this.state.southName !== undefined && this.state.southName !== null ) {
               let eastCheck = Object.entries(this.state.southName).length === 0;
               //console.log(eastCheck);
               if( eastCheck ) {
                    southNameToPublish = (<span className="waiting-on-player">Waiting...</span>);
               }
          }

          if( this.state.eastName !== undefined && this.state.eastName !== null ) {
               let eastCheck = Object.entries(this.state.eastName).length === 0;
               //console.log(eastCheck);
               if( eastCheck ) {
                    eastNameToPublish = (<span className="waiting-on-player">Waiting...</span>);
               }
          }

          if( this.state.westName !== undefined && this.state.westName !== null ) {
               let eastCheck = Object.entries(this.state.westName).length === 0;
               //console.log(eastCheck);
               if( eastCheck ) {
                    westNameToPublish = (<span className="waiting-on-player">Waiting...</span>);
               }
          }


          return (
               <>
               <h2 className="lets-play-headline">Let's Play!</h2>
               {dealNewHandButton}
               <div className="players-listing-area">
                    <div className="single-player">North: {northNameToPublish}</div>
                    <div className="single-player">South: {southNameToPublish}</div>
                    <div className="single-player">East: {eastNameToPublish}</div>
                    <div className="single-player">West: {westNameToPublish}</div>
               </div>
               <div className="hand-area">
                    {northCardsDisplay}
                    {southCardsDisplay}
                    {eastCardsDisplay}
                    {westCardsDisplay}
                    { this.state.timestampLastDeal > 0 &&
                         <div className="last-dealt game-footer-info">Last Dealt: {this.convert(this.state.timestampLastDeal)}</div>
                    }
               </div>
               <div className="game-footer-info">Game ID#: {this.props.gameID}</div>
               <Beforeunload onBeforeunload={() => "Leaving this page will cause you to lose all data and not be able to return to your game."} />
               </>
               );
     }

}


export default LiveGame;
