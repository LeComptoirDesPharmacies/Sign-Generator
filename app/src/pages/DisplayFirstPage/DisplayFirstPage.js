import React from 'react';
import S3CredentialsPage from "../S3CredentialsPage/S3CredentialsPage"
import settingService from "../../services/SettingService"
import SetupPage from "../SetupPage/SetupPage"
import CircularIndeterminate from "../../components/loader/circularIndeterminate"
import { withRouter } from 'react-router-dom';
import MainMenuPage from "../MainMenuPage/MainMenuPage"
import populate from "../../../db/model/populate"
import "./DisplayFirstPage.scss"

class DisplayFirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: null,
            isPathSet: null
        };
    };

    /**
     * Met à jour les State IsConnected et isPathSet pour savoir quelle page doit s'ouvrir à l'ouverture de l'app
     */
    async componentWillMount() {
        populate.createDepartment()
        this.setState({
            isConnected: await settingService.isS3Ready(),
            isPathSet: await settingService.isPathFill()
        })
    }

    render() {
        if (this.state.isConnected == true && this.state.isPathSet == true) {
            return (<MainMenuPage />)
        } else if (this.state.isConnected == true && this.state.isPathSet == false) {
            return (<SetupPage />)
        } else if (this.state.isConnected == false) {
            return (<S3CredentialsPage />)
        } else {
            return (<CircularIndeterminate />)
        }
    }
}

export default withRouter(DisplayFirstPage);