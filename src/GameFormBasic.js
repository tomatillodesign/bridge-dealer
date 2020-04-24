import React from 'react';

///////////////////////////////////////////////////////////////////////

class GameFormBasic extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               gameID: ''
          }

     }

     handleGameChange = (event) => {
          console.log(event.target.value);
          this.setState({ gameID: event.target.value });
       }

     handleGameSubmit = (event) => {
          event.preventDefault();
          this.props.handleGameSubmit(this.state.gameID);
     }

     render() {

          return (
               <>
               <form onSubmit={this.handleGameSubmit} id="join-a-game-form">
                 <label>
                    <span className="form-label-text">Enter the Game ID#:</span>
                    <input type="number" value={this.state.gameID} onChange={this.handleGameChange} required />
                 </label>
                 <input type="submit" value="Submit" />
               </form>
               </>

          );

     }

}


export default GameFormBasic;
