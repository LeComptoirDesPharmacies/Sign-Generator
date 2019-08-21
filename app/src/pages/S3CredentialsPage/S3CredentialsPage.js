import './S3Credentials.scss';
import React, { Component } from 'react';
import Form from '../../components/forms/form';
import { MyInputText } from '../../components/inputs/input';
import { MyButtonSubmit, MyButtonOnClick } from "../../components/buttons/buttons";
import { withRouter } from 'react-router-dom';
import S3 from "../../services/S3";
import CustomizedSnackbars from "../../components/modalMessage/modalMessage";
import PaperSheet from "../../components/papers/papers"
import "./S3Credentials.scss"
import settingService from "../../services/SettingService"
import keytarService from "../../services/KeytarService"

/**
 * Allows you to enter credentials for S3
 */
class S3CredentialsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiant: '',
      password: '',
      bucketName: '',
      errors: '',
      open: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.return = this.return.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * Quand le form est submit appelle les fonctions de vérification et d'enregistrement et envoie sur la page suivante
   */
  async handleSubmit(event) {
    const { identifiant, password, bucketName } = this.state;
    event.preventDefault();

    //TODO: Je ne comprend pas
    let errors = "";
    if (errors.length > 0) {
      this.setState({ errors: errors, open: true });
      return;
    }

    const s3 = new S3(bucketName, identifiant, password);

    s3.isValidCredential()
      .then((err) => {
        if (err) {
          this.setState({ errors: err, open: true });
        } else {
          settingService.createOrUpdateBucketName(bucketName);
          keytarService.saveS3Credentials(identifiant, password);
          if (this.props.location.state) {
            if (this.props.location.state.next == true) {
              this.props.history.push("/SettingsPage");
            }
          } else {
            this.props.history.push("/SetupPage");
          }
        }
      });
  }

  /**
   * Gère l'ouverture du modal d'erreur
   */
  setOpen(open) {
    this.setState({ open })
  }

  return() {
    this.props.history.push("/SettingsPage");
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="paper">
        {errors && <CustomizedSnackbars
          key={errors}
          variant="error"
          message={errors}
          setOpen={this.setOpen}
          open={this.state.open}
        />}
        <PaperSheet
          title="Veuillez rentrer les identifiants S3"
          classes='root'
          textAlign="center"
        >
          <Form
            submit={this.handleSubmit}
          >
            <div id="input_text">
              <MyInputText
                label="Bucket S3"
                value={this.state.bucketName}
                handleChange={this.handleChange}
                name="bucketName"
              />
            </div>
            <div id="input_text">
              <MyInputText
                label="ID"
                value={this.state.identifiant}
                handleChange={this.handleChange}
                name="identifiant"
              />
            </div>
            <div id="input_text">
              <MyInputText
                label="Key"
                value={this.state.password}
                handleChange={this.handleChange}
                name="password"
              />
            </div>
            <div id="button_text">
              <MyButtonSubmit
                text="Enregistrer"
                classes='default'
              />
            </div>
          </Form>
        </PaperSheet>
        <div id="button">
          {this.props.location.state ?
            <MyButtonOnClick
              onClick={this.return}
              text='Retour'
              classes='default'
            /> :
            null
          }
        </div>
      </div>
    );
  }
}

export default withRouter(S3CredentialsPage);