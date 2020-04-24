import React from 'react';

///////////////////////////////////////////////////////////////////////

class NameFormBasic extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               name: ''
          }

     }

     handleNameChange = (event) => {
          console.log(event.target.value);
          this.setState({ name: event.target.value });
       }

     handleNameSubmit = (event) => {
          event.preventDefault();
          this.props.setPlayerName(this.state.name);
     }

     render() {

          return (
               <>
               <form onSubmit={this.handleNameSubmit} id="name-form-basic">
                 <label>
                    <span className="name-enter-text">Enter Your Name:</span>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} required />
                 </label>
                 <input type="submit" value="Submit" />
               </form>
               </>

          );

     }

}


export default NameFormBasic;
