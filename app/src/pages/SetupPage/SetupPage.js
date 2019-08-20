import './SetupPage.scss';
import React, { Component } from 'react';
import FileSearch from '../../components/fileSearch/fileSearch'
import "./SetupPage.scss"
import FileInput from "../../components/fileDialogue/fileInput"
import PaperSheet from "../../components/papers/papers"
import { MyButtonOnClick } from "../../components/buttons/buttons"
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CustomizedSnackbars from '../../components/modalMessage/modalMessage'
import settingService from "../../services/SettingService"

//Page de configuration
class SetupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            open: true,
            variant: '',
            dirName: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClick = this.onClick.bind(this)
        this.fileInput = React.createRef();
        this.setOpen = this.setOpen.bind(this)
        this.return = this.return.bind(this)
    }

    async onClick(event) {
        this.handleSubmit(event)
    }

    /**
     * Vérifie que les champs ont été renseigné, sauvegarde l'url du logo dans la db et envoie sur la page suivante
     */
    async handleSubmit(event) {
        event.preventDefault();
        if (!this.props.location.state) {
            if (this.fileInput.current.files[0] == undefined) {
                this.setState({
                    message: "Il faut renseigner un dossier de sauvegarde pour les signatures",
                    open: true,
                    variant: "error"
                })
                return;
            }
            let path = this.fileInput.current.files[0].path
            console.log("PATH setuPage ---> ", path)
            settingService.createOrUpdatePath(path);
            this.setState({
                message: "C'est bon ! Merci.",
                open: true,
                variant: "success"
            });
            if (!await settingService.isLogoExist()) {
                this.setState({
                    message: "Il faut renseigner une image pour le logo",
                    open: true,
                    variant: "error"
                })
                return;
            }
            this.props.history.push("/MainMenuPage");
        } else {
            this.props.history.push("/SettingsPage");
        }
    }

    /**
     * Gère l'ouverture du modal d'erreur
     * @param {*} open 
     */
    setOpen(open) {
        this.setState({ open })
    }

    return() {
        this.props.history.push("/SettingsPage");
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                {message && <CustomizedSnackbars
                    key={message}
                    variant={this.state.variant}
                    message={message}
                    setOpen={this.setOpen}
                    open={this.state.open}
                />}
                <Grid container spacing={3} direction="row" alignItems="center" justify='center'>
                    <Grid item xs={4}>
                        <PaperSheet
                            title="Choisir le logo de l'entreprise"
                            classes='root'
                            textAlign='center'
                        >
                            <FileSearch
                                fileName={"logo"}
                                redirect={false}
                            />
                        </PaperSheet>
                    </Grid>
                    <Grid item xs={4}>
                        <PaperSheet
                            title="Choisir un dossier de stockage"
                            classes='root'
                            textAlign='center'
                        >
                            <FileInput
                                handleSubmit={this.handleSubmit}
                                fileInput={this.fileInput}
                                dirName={this.state.dirName}
                            />
                        </PaperSheet>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Grid item xs={2}>
                        <MyButtonOnClick
                            onClick={this.onClick}
                            text='Suivant'
                            classes='default'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {this.props.location.state ?
                            <MyButtonOnClick
                                onClick={this.return}
                                text='Retour'
                                classes='default'
                            /> :
                            null
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withRouter(SetupPage);