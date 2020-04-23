import React from 'react';

///////////////////////////////////////////////////////////////////////

class EnterGameID extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               gameID: ''
          }

     }

     handleGameIDChange = (event) => {
          console.log(event.target.value);
          this.setState({ gameID: event.target.value });
       }

     handleGameSubmit = (event) => {
          event.preventDefault();
          this.props.doesGameExist(this.state.gameID);
     }

     render() {

          return (
               <>
               <form onSubmit={this.handleGameSubmit}>
                 <label>
                    Enter Game ID#:
                    <input type="number" value={this.state.gameID} onChange={this.handleGameIDChange} required />
                 </label>
                 <input type="submit" value="Create Game Now" />
               </form>
               </>

          );

     }

}


export default EnterGameID;
