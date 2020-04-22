import React, { Component } from 'react';
import Select from 'react-select';

class ChoosePosition extends React.Component {

     constructor(props) {
          super(props);

     }


     setPosition = (selectedOption) => {
          if(selectedOption) {
               this.props.changePosition(selectedOption);
          }

     }



     render() {

          const position = [
               { value: 'south', label: 'South' },
               { value: 'east', label: 'East' },
               { value: 'west', label: 'West' },
          ];

          return (
            <Select
               placeholder='Select Side of the Table'
               options={position}
               isSearchable
               onChange={this.setPosition}
            />
          );

     }

}

export default ChoosePosition;
