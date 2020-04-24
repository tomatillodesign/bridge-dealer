import React from 'react';
import GameFormBasic from './GameFormBasic';
import base from './base';
import { firebaseApp } from './base';

///////////////////////////////////////////////////////////////////////

class JoinGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               playerName: '',
               gameID: '',
               warning: false
          }

     }


     handleGameSubmit = (id) => {
          console.log(id);
          const gameID = parseInt(id);

          let allGamesByID = null;
            base.fetch('allGames', {
              context: this,
              asArray: true
            }).then(data => {

              console.log(data);
              // use mapping to get an array of all the GameIDs, then check that the new game is a unique number
              allGamesByID = data.map(function(game) { return parseInt(game.gameID); });
              if( allGamesByID.includes(gameID) ) {

                   console.log("GOOD TO GO!");
                   this.setState({ gameID, warning: false });

              } else {
                   // if new game number is unique, set isValidGameID to true and enter Name
                   console.log("THAT GAME DOES NOT EXIST");
                   this.setState({ warning: true, gameID: '' });
              }

            }).catch(error => {
              //handle error
         });

     }


     render() {

          let form = null;
          if( this.state.gameID === '' ) {
               form = (
                    <GameFormBasic
                         handleGameSubmit={this.handleGameSubmit}
                    />
               );
          }


          let warning = null;
          if( this.state.warning === true ) {
               warning = (<div className="warning">Sorry, that game does not exist. Try again?</div>);
          }

          return (
               <>
               <h2>Join a Game</h2>
               {warning}
               {form}
               </>

          );

     }

}


export default JoinGame;
