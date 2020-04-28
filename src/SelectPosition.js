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

          const northRadioBtn = (<div className="form-check">
            <div className="disabled">North: {this.props.northName}</div>
          </div>);

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
                    className="form-check-input form-radio"
                   />
                   South
                 </label>
               </div>);
          } else if( this.props.southName ) {
               southRadioBtn = (<div className="form-check">
                 <div className="disabled">South: {this.props.southName}</div>
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
                    className="form-check-input form-radio"
                   />
                   East
                 </label>
               </div>);
          } else if( this.props.eastName ) {
               eastRadioBtn = (<div className="form-check">
                 <div className="disabled">East: {this.props.eastName}</div>
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
                    className="form-check-input form-radio"
                   />
                   West
                 </label>
               </div>);
          } else if( this.props.westName ) {
               westRadioBtn = (<div className="form-check">
                 <div className="disabled">West: {this.props.westName}</div>
               </div>);
          }


          let saveButton = (
               <button className="btn btn-primary mt-2" type="submit">
                 Save
               </button>);
          console.log(availableSeats);
          if( availableSeats.length < 1 ) {
               saveButton = (
                    <button className="btn btn-primary mt-2" type="submit"><a href="/bridge-dealer">
                      Sorry, this game is full. Start over?
                    </a></button>);
          }

          return (
               <>
               <h3>Select a Seat at the Table: {this.state.position}</h3>
               <form onSubmit={this.handleRadioSubmit} id="select-position-form">

                 {northRadioBtn}
                 {southRadioBtn}
                 {eastRadioBtn}
                 {westRadioBtn}

                 <div className="form-group">
                   {saveButton}
                 </div>

               </form>
               </>

          );

     }

}


export default SelectPosition;
