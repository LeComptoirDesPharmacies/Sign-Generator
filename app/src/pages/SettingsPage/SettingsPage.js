import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MyButtonOnClick } from "../../components/buttons/buttons"
import Grid from '@material-ui/core/Grid';
import "./SettingsPage.scss"


//Page de configuration
class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.onClickLogo = this.onClickLogo.bind(this)
        this.onClickS3 = this.onClickS3.bind(this)
    }

    onClickLogo() {
        this.props.history.push({
            pathname: "/SetupPage",
            state: { next: true }
        })
    }

    onClickS3() {
        this.props.history.push({
            pathname: "/S3Credentials",
            state: { next: true }
        })
    }

    render() {
        return (
            <>
                <Grid container spacing={1} direction="row" alignItems="center" justify='center'>
                    <Grid item xs={4} align="center">
                        <MyButtonOnClick
                            text="Changer logo et dossier"
                            onClick={this.onClickLogo}
                            classes="default"
                        />
                        <MyButtonOnClick
                            text="Changer identifiants S3"
                            onClick={this.onClickS3}
                            classes="default"
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default withRouter(SettingsPage);