import React from 'react';
import CreatableSelect from 'react-select/creatable';

class CreatableMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <CreatableSelect
            isDisabled={this.props.isLoading}
            isLoading={this.props.isLoading}
            onChange={this.props.handleChange}
            onCreateOption={this.props.handleCreate}
            options={this.props.options}
            value={this.props.value}
            placeholder={this.props.placeholder}
          />
        );
      }
}

export default CreatableMenu;