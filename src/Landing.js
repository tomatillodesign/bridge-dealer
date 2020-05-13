import React from 'react';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';
import ReJoinGame from './ReJoinGame';

///////////////////////////////////////////////////////////////////////

class Landing extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentGameID: null,
               createGame: false,
               joinGame: false,
               rejoinGame: false,
          }

     }

     creatingNewGame = (event) => {
          event.preventDefault();
          this.setState({
             createGame: true
          });
     }


     joiningAGame = (event) => {
          event.preventDefault();
          this.setState({
             joinGame: true
          });
     }


     rejoiningAGame = (event) => {
          event.preventDefault();
          this.setState({
             rejoinGame: true
          });
     }


     render() {

          const gameID = localStorage.getItem('bridgeDealer.gameID');
          const playerName = localStorage.getItem('bridgeDealer.loggedIn');
          const playerPosition = localStorage.getItem('bridgeDealer.position');
          console.log("CURRENT GAMEID: " + gameID);

          // decide what to show visitors in the app
          let appView = (
               <>
               {gameID &&
               <div className="action-button-area rejoin-area">
                    <button id="rejoin-active-game" onClick={this.rejoiningAGame}>
                         <span className="rejoin-main-text">Re-Join Current Game</span>
                         <span className="rejoin-details">ID#: {gameID}</span>
                         <span className="rejoin-details">Name: {playerName}</span>
                         <span className="rejoin-details">Position: {playerPosition}</span>
                    </button>
               </div>
               }

               <div className="action-button-area">
                    <button onClick={this.joiningAGame}>Join Game</button>
                    <button onClick={this.creatingNewGame}>Create New Game</button>
               </div>
               </>);

          if( this.state.createGame === true ) {
               appView = (
                    <CreateGame />
               );
          }

          if( this.state.joinGame === true ) {
               appView = (
                    <JoinGame />
               );
          }

          if( this.state.rejoinGame === true ) {
               appView = (
                    <ReJoinGame
                         gameID={gameID}
                         playerName={playerName}
                         position={playerPosition}
                    />
               );
          }

          return(
               <div className="single-page-area">
                    {appView}
               </div>
          );

     }

}


export default Landing;
