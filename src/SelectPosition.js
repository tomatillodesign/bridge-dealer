import React from 'react';

///////////////////////////////////////////////////////////////////////

class SelectPosition extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               position: '',
               selectedOption: '',
          }

     }

     handleOptionChange = (event) => {
          console.log(event.target.value);
         this.setState({
           position: event.target.value
         });
       }

       handleRadioSubmit = (event) => {
        event.preventDefault();
        console.log("You have submitted: " + this.state.position);
        this.props.setPlayerPosition(this.state.position);
       };

     render() {

          const availableSeats = this.props.availableSeats;

          let southRadioBtn = null;
          if( availableSeats.includes('South')) {
               southRadioBtn = (<div className="form-check">
                 <label>
                   <input
                    type="radio"
                    name="react-tips"
                    value="South"
                    checked={this.state.position === "South"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                   />
                   South
                 </label>
               </div>);
          }

          let eastRadioBtn = null;
          if( availableSeats.includes('East')) {
               eastRadioBtn = (<div className="form-check">
                 <label>
                   <input
                    type="radio"
                    name="react-tips"
                    value="East"
                    checked={this.state.position === "East"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                   />
                   East
                 </label>
               </div>);
          }

          let westRadioBtn = null;
          if( availableSeats.includes('West')) {
               westRadioBtn = (<div className="form-check">
                 <label>
                   <input
                    type="radio"
                    name="react-tips"
                    value="West"
                    checked={this.state.position === "West"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                   />
                   West
                 </label>
               </div>);
          }

          return (
               <>
               <h3>Select a Seat at the Table: {this.state.position}</h3>
               <form onSubmit={this.handleRadioSubmit}>

                 {southRadioBtn}
                 {eastRadioBtn}
                 {westRadioBtn}

                 <div className="form-group">
                   <button className="btn btn-primary mt-2" type="submit">
                     Save
                   </button>
                 </div>

               </form>
               </>

          );

     }

}


export default SelectPosition;
