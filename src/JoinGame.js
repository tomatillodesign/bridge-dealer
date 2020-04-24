import React from 'react';
import GameFormBasic from './GameFormBasic';
import NameFormBasic from './NameFormBasic';
import SelectPosition from './SelectPosition';
import LiveGame from './LiveGame';
import base from './base';
import { firebaseApp } from './base';

///////////////////////////////////////////////////////////////////////

class JoinGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               gameID: '',
               availableSeats: [],
               position: '',
               playerName: '',
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
                   this.availableSeats(gameID);

              } else {

                   console.log("THAT GAME DOES NOT EXIST");
                   this.setState({ warning: true, gameID: '' });
              }

            }).catch(error => {
              //handle error
         });

     }


     setPlayerPosition = (position) => {
          console.log(position);
         this.setState({ position: position });
    }


     setPlayerName = (name) => {
         console.log(name);
         this.setState({ playerName: name });

         if( this.state.position === 'South' ) {
              base.update(`allGames/${this.state.gameID}`, {
                   data: { southName: name }
                 }).then(() => {
                   console.log("Added New Player");
                 }).catch(err => {
                   // handle error
                 });
            }

       if( this.state.position === 'East' ) {
           base.update(`allGames/${this.state.gameID}`, {
                data: { eastName: name }
               }).then(() => {
                console.log("Added New Player");
               }).catch(err => {
                // handle error
               });
         }

         if( this.state.position === 'West' ) {
             base.update(`allGames/${this.state.gameID}`, {
                  data: { westName: name }
                 }).then(() => {
                  console.log("Added New Player");
                 }).catch(err => {
                  // handle error
                 });
           }

     }



     availableSeats = (gameID) => {

          let availableSeats = ['South', 'East', 'West'];

          base.fetch(`allGames/${gameID}`, {
            context: this,
            asArray: false
          }).then(data => {

            console.log(data);

            if( data.northName !== undefined ) {
                 console.log("NORTHNAME: " + data.northName);
            }

            if( data.southName !== undefined ) {
               console.log("SOUTHNAME: " + data.southName);
               availableSeats = availableSeats.filter(item => item !== 'South');
               console.log(availableSeats);
            }

            if( data.eastName !== undefined ) {
               console.log("EASTNAME: " + data.eastName);
               availableSeats = availableSeats.filter(item => item !== 'East');
               console.log(availableSeats);
            }

            if( data.westName !== undefined ) {
               console.log("WESTNAME: " + data.westName);
               availableSeats = availableSeats.filter(item => item !== 'West');
               console.log(availableSeats);
            }

            this.setState({ availableSeats: availableSeats });

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
          } else if ( this.state.gameID !== '' && this.state.position === '' && this.state.playerName === ''  ) {
               form = (
                    <SelectPosition
                         gameID={this.state.gameID}
                         setPlayerPosition={this.setPlayerPosition}
                         availableSeats={this.state.availableSeats}
                    />
               );
          } else if ( this.state.gameID !== '' && this.state.position !== '' && this.state.playerName === ''  ) {
               form = (
                    <NameFormBasic
                         setPlayerName={this.setPlayerName}
                         gameID={this.state.gameID}
                    />
               );
          }


          let warning = null;
          if( this.state.warning === true ) {
               warning = (<div className="warning">Sorry, that game does not exist. Try again?</div>);
          }

          let status = [];
          if( this.state.gameID !== '' ) {
               status.push(<div className="status game-id" key="status-game-id">Game ID#: {this.state.gameID}</div>);
          }
          if( this.state.position !== '' ) {
               status.push(<div className="status position" key="status-position">Seat: {this.state.position}</div>);
          }



          let signInInfo = (
               <>
               <h2>Join a Game</h2>
               {warning}
               <div className="status-area">{status}</div>
               <div className="available-seats">Available Seats: {this.state.availableSeats}</div>
               {form}
               </>
          );


          let liveGame = null;
          if( this.state.playerName && this.state.gameID ) {

               if( this.state.position === 'South' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.state.playerName}
                                        southName={this.state.playerName}
                                        gameID={this.state.gameID}
                                   />);
               }

               if( this.state.position === 'East' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.state.playerName}
                                        eastName={this.state.playerName}
                                        gameID={this.state.gameID}
                                   />);
               }

               if( this.state.position === 'West' ) {
                    liveGame = ( <LiveGame
                                        loggedIn={this.state.playerName}
                                        westName={this.state.playerName}
                                        gameID={this.state.gameID}
                                   />);
               }


               signInInfo = null;
          }




          return (
               <>
               {signInInfo}
               {liveGame}
               </>

          );

     }

}


export default JoinGame;
