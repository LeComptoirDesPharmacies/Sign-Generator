import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CustomizedSnackbars from "../../components/modalMessage/modalMessage";
import Grid from '@material-ui/core/Grid';
import FileSearch from '../../components/fileSearch/fileSearch';
import PaperSheet from "../../components/papers/papers";
import Form from '../../components/forms/form';
import { MyInputText } from '../../components/inputs/input';
import { MyButtonSubmit } from "../../components/buttons/buttons";
import { Banner } from "../../../db"
import "./UploadBannerPage.scss";

/**
 * Page pour upload les bandeaux
 */
class UploadBannerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            variant: '',
            open: true,
            bannerName: '',
            saveBannerName: '',
            redirectLinkBanner: '',
            banner: ''
        };

        this.setOpen = this.setOpen.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Gère l'ouverture du modal d'erreur
     * @param {*} open 
     */
    setOpen(open) {
        this.setState({ open })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ saveBannerName: this.state.bannerName })
        await Banner.create({name: this.state.bannerName, redirectUrl: this.state.redirectLinkBanner}).then(test => {
            this.setState({banner: test.dataValues.id})
        })
    }

    render() {
        const { message, saveBannerName } = this.state;
        return (
            <div>
                {/* {message && <CustomizedSnackbars
                    key={message}
                    variant={this.state.variant}
                    message={message}
                    setOpen={this.setOpen}
                    open={this.state.open}
                />} */}
                <Grid container spacing={3} direction="row" alignItems="center" justify='center'>
                    {saveBannerName && <Grid item xs={9}>
                        <PaperSheet
                            title="Importer un bandeau"
                            height='250px'
                            classes="second"
                        >
                            <FileSearch
                                fileName={saveBannerName}
                                redirect={true}
                                location={this.props.location}
                                dataName={'imgUrl'}
                                banner={this.state.banner}
                            />
                        </PaperSheet>
                    </Grid>
                    }
                    <Form
                        submit={this.handleSubmit}
                    >
                        {!saveBannerName &&
                            <div>
                                <div id="input_text">
                                    <MyInputText
                                        label="Nom du bandeau"
                                        value={this.state.bannerName}
                                        handleChange={this.handleChange}
                                        name="bannerName"
                                    />
                                </div>
                                <div id="input_text">
                                    <MyInputText
                                        label="Lien de redirection"
                                        value={this.state.redirectLinkBanner}
                                        handleChange={this.handleChange}
                                        name="redirectLinkBanner"
                                    />
                                </div>
                                <div id="button_text">
                                    <MyButtonSubmit
                                        text="Enregistrer"
                                        classes='default'
                                    />
                                </div>
                            </div>
                        }
                    </Form>
                </Grid>
            </div>
        );
    }
}
export default withRouter(UploadBannerPage);