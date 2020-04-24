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
               <form onSubmit={this.handleGameSubmit}>
                 <label>
                    Enter the Game ID#:
                    <input type="number" value={this.state.gameID} onChange={this.handleGameChange} required />
                 </label>
                 <input type="submit" value="Submit" />
               </form>
               </>

          );

     }

}


export default GameFormBasic;
