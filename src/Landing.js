import React from 'react';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

///////////////////////////////////////////////////////////////////////

class Landing extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               currentGameID: null,
               createGame: false,
               joinGame: false
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


     render() {

          // decide what to show visitors in the app
          let appView = (
               <div className="action-button-area">
                    <button onClick={this.joiningAGame}>Join Game</button>
                    <button onClick={this.creatingNewGame}>Create New Game</button>
               </div>);

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

          return(
               <div className="single-page-area">
                    {appView}
               </div>
          );

     }

}


export default Landing;
