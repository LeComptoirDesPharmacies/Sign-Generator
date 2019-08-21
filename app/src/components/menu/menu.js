import React from 'react';
import Select from 'react-select';

  class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    
      render() {
        return (
          <Select
            value={this.props.selectedOption}
            onChange={this.props.handleChange}
            options={this.props.options}
          />
        );
      }
  }

  export default Menu;