import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MyInputText } from '../../components/inputs/input';
import { MyButtonSubmit } from "../../components/buttons/buttons";
import PaperSheet from "../../components/papers/papers";
import Form from '../../components/forms/form';
import Grid from '@material-ui/core/Grid';
import "./CreateSignPage.scss";
import DepartmentService from "../../services/DepartmentsService"
import SignaturesService from '../../services/SignaturesService';
import { Setting } from '../../../db'
import SignatureFile from "../../services/CreateHtmlFile"
import CreatableMenu from "../../components/menu/creatableMenu"
import createNotification from "../../components/modalMessage/notifications"

const successNotif = createNotification('success');

/**
 * Création d'une signature
 */
class CreateSignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            position: '',
            department: '',
            email: '',
            phone: '',
            errors: '',
            open: true,
            message: '',
            variant: '',
            formErrors: {},
            options: [],
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    /**
     * Enregistre les info de la signature dans la db
     */
    async saveData() {
        let department = await DepartmentService.createDepartmentName(this.state.department.label)
        const signature = {
            lastName: this.state.lastName.replace(/\s/g, ''),
            firstName: this.state.firstName.replace(/\s/g, ''),
            position: this.state.position.replace(/\s/g, ''),
            departmentId: department.dataValues.id,
            email: this.state.email.replace(/\s/g, ''),
            phone: this.state.phone
        };
        let data = await SignaturesService.createOrUpdateSignature(this.props.id, signature)
        this.setState({
            message: "C'est bon ! Merci.",
            open: true,
            variant: "success",
            firstName: '',
            lastName: '',
            position: '',
            department: '',
            email: '',
            phone: ''
        })
        return data.dataValues
    }

    /**
     * Récupère les valeurs des différents éléments et appelle les fonctions pour les traiter
     */
    async handleSubmit(event) {
        event.preventDefault();
        await this.handleValidation()
        if (Object.entries(this.state.formErrors).length === 0) {
            let signature = await this.saveData().then(successNotif())
            await this.createHtmlFile(signature)
        }
    }

    async createHtmlFile(signature) {
        let settings = await Setting.findAll({ limit: 1 })
        let signatureFile = new SignatureFile(signature, settings[0].dataValues, signature.departmentId)
        signatureFile.buildHtmlFile()
    }

    async handleValidation() {
        const { firstName,
            lastName,
            position,
            department,
            email,
            phone
        } = this.state
        let formErrors = {}
        const emptyField = 'Le champ ne peut pas être vide'
        const validEmailRegex =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

        if (!firstName) {
            formErrors["firstName"] = emptyField
        }
        if (!lastName) {
            formErrors["name"] = emptyField
        }
        if (!position) {
            formErrors["position"] = emptyField
        }
        if (!department) {
            formErrors["department"] = emptyField
        }
        if (!email) {
            formErrors["email"] = emptyField
        }
        if (email) {
            if (!validEmailRegex.test(email)) {
                formErrors["email"] = "Cet email n'est pas valide"
            }
        }
        if (phone) {
            if (phone.replace(/[^0-9]/g, "").length != 10) {
                formErrors["phone"] = 'Un numéro doit contenir 10 chiffres'
            }
        }
        this.setState({ formErrors: formErrors })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    setOpen(open) {
        this.setState({ open })
    }

    async componentDidMount() {
        let options = await DepartmentService.getAllDepartmentName()
        this.setState({ options: options })
        if (this.props.update == true) {
            let data = await SignaturesService.getSignatureWithId(this.props.id)
            let department = await DepartmentService.getDepartmentName(data.dataValues.departmentId)
            this.setState({
                firstName: data.dataValues.firstName,
                lastName: data.dataValues.lastName,
                position: data.dataValues.position,
                department: department.dataValues.name,
                email: data.dataValues.email,
                phone: data.dataValues.phone
            })
        }
    }

    handleChangeCreate = (newValue, actionMeta) => {
        if (newValue) {
            this.setState({ department: newValue });
        }
    };

    createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    handleCreate = (inputValue) => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            const { options } = this.state;
            const newOption = this.createOption(inputValue);
            this.setState({
                isLoading: false,
                options: [...options, newOption],
                department: newOption,
            });
        }, 1000);
    };

    render() {
        const { isLoading, options, department } = this.state;
        return (
            <>
                <Grid container spacing={1} direction="row" alignItems="center" justify='center'>
                    <Grid item xs={11} align="center">
                        <PaperSheet
                            title="Création de signature"
                            classes='third'
                            textAlign='center'
                        >
                            <Form
                                submit={this.handleSubmit}
                            >
                                <div>
                                    <MyInputText
                                        label="Prénom"
                                        value={this.state.firstName}
                                        handleChange={this.handleChange}
                                        name="firstName"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["firstName"]}</span>
                                </div>
                                <div>
                                    <MyInputText
                                        label="Nom de famille"
                                        value={this.state.lastName}
                                        handleChange={this.handleChange}
                                        name="lastName"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["name"]}</span>
                                </div>
                                <div>
                                    <MyInputText
                                        label="Poste"
                                        value={this.state.position}
                                        handleChange={this.handleChange}
                                        name="position"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["position"]}</span>
                                </div>
                                <div className="menu">
                                    <CreatableMenu
                                        value={department}
                                        isLoading={isLoading}
                                        handleChange={this.handleChangeCreate}
                                        options={options}
                                        handleCreate={this.handleCreate}
                                        placeholder="Departement"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["department"]}</span>
                                </div>
                                <div>
                                    <MyInputText
                                        label="Adresse mail"
                                        value={this.state.email}
                                        handleChange={this.handleChange}
                                        name="email"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["email"]}</span>
                                </div>
                                <div>
                                    <MyInputText
                                        label="Numéro de téléphone"
                                        value={this.state.phone}
                                        handleChange={this.handleChange}
                                        name="phone"
                                    />
                                </div>
                                <div>
                                    <span className="error">{this.state.formErrors["phone"]}</span>
                                </div>
                                <div id="input">
                                    <MyButtonSubmit
                                        text="Enregistrer"
                                        classes='default'
                                    />
                                </div>
                            </Form>
                        </PaperSheet>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default withRouter(CreateSignPage);