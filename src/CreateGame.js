import React from 'react';
import EnterGameID from './EnterGameID';
import NameFormBasic from './NameFormBasic';
import LiveGame from './LiveGame';
import base from './base';
import { firebaseApp } from './base';

///////////////////////////////////////////////////////////////////////

class CreateGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               playerName: '',
               gameID: '',
               isValidGameID: false,
               duplicate: false,
          }

     }



     doesGameExist = (id) => {

          const gameID = parseInt(id);
          console.log(parseInt(gameID));
          let waitingCheck = true;

          let allGamesByID = null;
            base.fetch('allGames', {
              context: this,
              asArray: true
            }).then(data => {

              console.log(data);
              // use mapping to get an array of all the GameIDs, then check that the new game is a unique number
              allGamesByID = data.map(function(game) { return parseInt(game.gameID); });
              if( allGamesByID.includes(gameID) ) {
                   this.setState({ isValidGameID: false, duplicate: true });
                   console.log("ALREADY TAKEN");
                   waitingCheck = false;
              } else {
                   // if new game number is unique, set isValidGameID to true and enter Name
                   console.log("WORKED");
                   this.setState({ isValidGameID: true, gameID: gameID, duplicate: false });
              }

            }).catch(error => {
              //handle error
         });



         // if( waitingCheck === false ) {
         //
         //         base.post(`allGames/${gameID}`, {
         //             data: { gameID: gameID }
         //           }).then(() => {
         //             console.log("Created New Game via base.post");
         //           }).catch(err => {
         //             // handle error
         //           });
         //
         //      }

     }



     setPlayerName = (name) => {
         console.log(name);
         this.setState({ playerName: name });


         base.update(`allGames/${this.state.gameID}`, {
              data: { northName: name }
            }).then(() => {
              console.log("Added New Player");
            }).catch(err => {
              // handle error
            });

     }


     setGameID = (gameID) => {

          base.post(`allGames/${gameID}`, {
              data: { gameID: gameID }
            }).then(() => {
              console.log("Created New Game via base.post");
            }).catch(err => {
              // handle error
            });

     }


     render() {

          console.log(this.state.duplicate);

          let liveGame = null
          if( this.state.playerName && this.state.gameID ) {
               liveGame = ( <LiveGame
                                   loggedIn={this.state.playerName}
                                   northName={this.state.playerName}
                                   gameID={this.state.gameID}
                              />);
          }

          let nameForm = null;
          if( this.state.isValidGameID && !this.state.playerName ) {
               nameForm = (
                              <>
                              <h2>Create a New Game</h2>
                              <NameFormBasic
                                   setPlayerName={this.setPlayerName}
                              />
                              </>
                         );
               this.setGameID(this.state.gameID);
          } else if ( this.state.isValidGameID && this.state.playerName ) {
               nameForm = null;
          }


          let warning = null;
          if( this.state.duplicate === true ) {
               warning = (<div className="warning">Sorry, that game was already created. Try again?</div>);
          }


          return (
               <>
               { this.state.isValidGameID === false &&
                    <>
                    <h2>Create a New Game</h2>
                    {warning}
                    <EnterGameID
                         doesGameExist={this.doesGameExist}
                    />
                    </>
               }
               { nameForm }
               { liveGame }
               </>

          );

     }

}


export default CreateGame;
