import React from 'react';
import { Link, Redirect } from "react-router-dom";

///////////////////////////////////////////////////////////////////////

class CreateGame extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               playerName: '',
               gameID: '',
               createGameFormActive: true
          }

     }


     handleNameChange = (event) => {
          console.log(event.target.value);
         this.setState({
              playerName: event.target.value,
              gameFormActive: true
         });
       }

       handleGameChange = (event) => {
           console.log(event.target.value);
          this.setState({
               gameID: event.target.value,
               gameFormActive: true
          });
        }


      handleGameSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.props.createNewGame(this.state.gameID);
        this.setState({
             createGameFormActive: false
        });
      }



     render() {

          if (this.state.createGameFormActive == false) {
           return <Redirect to={{
             pathname: `/game/${this.state.gameID}`,
             data: {
                  gameID: this.state.gameID,
                  playerName: this.state.playerName
             }
           }} />
         }

          return (
               <>
               <h2>Create a New Game</h2>
               <form onSubmit={this.handleGameSubmit}>
               <label>
                  Your Name:
                  <input type="text" value={this.state.playerName} onChange={this.handleNameChange} required />
               </label>
                 <label>
                    GameID #:
                    <input type="number" value={this.state.gameID} onChange={this.handleGameChange} required />
                 </label>
                 <input type="submit" value="Create Game Now" />
               </form>
               </>

          );

     }

}


export default CreateGame;
