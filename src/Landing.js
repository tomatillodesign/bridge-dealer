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

     // joinGame = (event) => {
     //      event.preventDefault();
     //      this.setState({
     //         gameFormActive: true
     //      });
     // }
     //
     // handleNameChange = (event) => {
     //     this.setState({
     //          playerName: event.target.value,
     //          gameFormActive: true
     //     });
     //   }
     //
     //   handleGameChange = (event) => {
     //      this.setState({
     //           gameID: event.target.value,
     //           gameFormActive: true
     //      });
     //    }
     //
     //
     //  handleJoinGameSubmit = (event) => {
     //    event.preventDefault();
     //    console.log(event.target.value);
     //    this.props.createNewPlayerName(this.state.playerName);
     //    this.setState({
     //         gameFormActive: false,
     //         joinedGame: true
     //    });
     //  }
     //
     //
     //  changePosition = ( option ) => {
     //       this.setState({
     //          position: option
     //       });
     //  }


     render() {

          // decide what to show visitors in the app
          let appView = (
               <div className="action-button-area">
                    <button>Join Game</button>
                    <button onClick={this.creatingNewGame}>Create New Game</button>
               </div>);

          if( this.state.createGame === true ) {
               appView = (
                    <CreateGame />
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
