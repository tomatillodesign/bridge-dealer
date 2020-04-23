import React from 'react';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

///////////////////////////////////////////////////////////////////////

class Landing extends React.Component {

     constructor(props) {
          super(props);
          this.state = {

          }

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

          return(

               <div className="single-page landing">
                    <button>Join Game</button>
                    <button>Create New Game</button>
               </div>

          );

     }

}


export default Landing;
