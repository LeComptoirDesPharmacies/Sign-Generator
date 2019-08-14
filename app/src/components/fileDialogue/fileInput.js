import React from 'react';
import { MyButtonText } from "../buttons/buttons"
import { BasicChip } from "../chips/chips"

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirName: ''
    }
  }

  /**
   * Mets le state dirName à jour avec le path du répertoire choisi
   */
  onChange = e => {
    this.setState({ dirName: e.current.files[0].path })
  };

  render() {
    var divStyle = {
      display: 'none'
    };
    const { dirName } = this.state;

    return (
      <form onSubmit={this.props.handleSubmit}>
        <input
          style={divStyle}
          id="contained-button-file"
          type="file"
          directory="true"
          webkitdirectory="true"
          ref={this.props.fileInput}
          onChange={(event) => this.onChange(this.props.fileInput)}
        />
        <label htmlFor="contained-button-file">
          <MyButtonText
            text="Choisir dossier"
            classes='default'
          />
        </label>
        {dirName && <BasicChip
          text={dirName}
        />}
      </form>
    );
  }
}

export default FileInput;