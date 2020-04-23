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
               isValidGameID: false
          }

     }



     doesGameExist = (gameID) => {
          console.log(gameID);

          let allGamesByID = null;
            base.fetch('allGames', {
              context: this,
              asArray: true
            }).then(data => {

              console.log(data);
              // use mapping to get an array of all the GameIDs, then check that the new game is a unique number
              allGamesByID = data;
              console.log(allGamesByID);

              // if new game number is unique, set isValidGameID to true and enter Name
              this.setState({ isValidGameID: true, gameID: gameID });

            }).catch(error => {
              //handle error
         });

            base.post(`allGames/${gameID}`, {
                data: { gameID }
              }).then(() => {
                console.log("Created New Game");
              }).catch(err => {
                // handle error
              });

     }



     setPlayerName = (name) => {
         console.log(name);
         this.setState({ playerName: name });


         base.post(`allGames/${this.state.gameID}/northName`, {
              data: { name }
            }).then(() => {
              console.log("Added New Player");
            }).catch(err => {
              // handle error
            });



     }




     render() {

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
          } else if ( this.state.isValidGameID && this.state.playerName ) {
               nameForm = null;
          }

          return (
               <>
               { this.state.isValidGameID === false &&
                    <>
                    <h2>Create a New Game</h2>
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
