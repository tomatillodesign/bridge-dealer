import React from 'react';
import LiveGame from './LiveGame';
import GameForm from './GameForm';
import CreateGame from './CreateGame';
import { Link, Redirect } from "react-router-dom";
import ChoosePosition from './ChoosePosition';

///////////////////////////////////////////////////////////////////////

class Landing extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               gameID: '',
               playerName: '',
               position: '',
               gameFormActive: false,
               joinedGame: false,
          }

     }

     joinGame = (event) => {
          event.preventDefault();
          this.setState({
             gameFormActive: true
          });
     }

     handleNameChange = (event) => {
         this.setState({
              playerName: event.target.value,
              gameFormActive: true
         });
       }

       handleGameChange = (event) => {
          this.setState({
               gameID: event.target.value,
               gameFormActive: true
          });
        }


      handleJoinGameSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.props.createNewPlayerName(this.state.playerName);
        this.setState({
             gameFormActive: false,
             joinedGame: true
        });
      }


      changePosition = ( option ) => {
           this.setState({
              position: option
           });
      }


     render() {

          console.log(this.state.gameID);
          console.log(this.state.playerName);
          console.log(this.props.allGames);

          const thisGame = parseInt(this.state.gameID);

          let landingTop = null;
          let gameIDForm = null;
          let showGame = null;

          if (this.state.joinedGame === true && this.props.allGames.includes(thisGame)) {
           return <Redirect to={{
             pathname: `/game/${this.state.gameID}`,
             data: {
                  gameID: thisGame,
                  playerName: this.state.playerName,
                  position: this.state.position.value
             }
           }} />
      } else if (this.state.joinedGame === true && !this.props.allGames.includes(thisGame)) {
           console.log(parseInt(this.state.gameID));
           return (<p>That game does not exist. Create a new game or try again.</p>);
      }

          if( (this.state.gameFormActive === false && this.state.gameID === '') || this.state.gameFormActive === true ) {
               landingTop = (
                    <>
                    <h2>Landing Page</h2>
                    <button onClick={this.joinGame}>Join a Game</button>
                    <button><a href="/#create">Create a Game</a></button>
                    </>
               );
          }

          if( this.state.gameFormActive === true ) {
               gameIDForm = (
                    <form onSubmit={this.handleJoinGameSubmit}>
                    <label>
                      Your Name:
                      <input type="text" value={this.state.playerName} onChange={this.handleNameChange} required />
                   </label>
                     <label>
                        GameID #:
                        <input type="number" value={this.state.gameID} onChange={this.handleGameChange} required />
                     </label>
                     <ChoosePosition
                         changePosition={this.changePosition}
                       />
                     <input type="submit" value="Join Game Now" />
                    </form>
               );
          }

          if( this.state.gameFormActive === false && this.state.gameID !== '' ) {
               showGame = (
                    <LiveGame
                         gameID={this.state.gameID}
                         gameFormActive={this.state.gameFormActive}
                    />
               );
          }


          return (
               <>
               {landingTop}
               {gameIDForm}
               {showGame}
               </>
               );
     }

}


export default Landing;
