import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './SignOverviewPage.scss'
import DisplaySign from "../../components/displaySign/displaySign"
import FilteredList from "../../components/filteredList/filteredList"
import Grid from '@material-ui/core/Grid';
import CircularIndeterminate from "../../components/loader/circularIndeterminate"
import garbage from "../../../assets/img/bin.png"
import pencil from "../../../assets/img/pencil.png"
import PaperSheet from "../../components/papers/papers";
import SignaturesService from "../../services/SignaturesService"
import { Signature, Setting } from '../../../db'

/**
 * Page pour visualiser les signatures
 */
class SignOverviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalItems: [],
            id: '',
            fileName: ''
        }

        this.getFileName = this.getFileName.bind(this)
        this.deleteSignature = this.deleteSignature.bind(this)
        this.editSignature = this.editSignature.bind(this)
    }

    /**
     * Récupère les nom et prénom dans la db
     */
    async getItemsList() {
        let items = await Signature.findAll({
            attributes: ["firstName", "lastName", "id"],
            raw: true
        })
        return items
    }

    async componentWillMount() {
        let items = await this.getItemsList()
        if (items.length > 0) {
            this.setState({ finalItems: items })
        } else {
            this.setState({ finalItems: ['rien'] })
            return;
        }
    }

    /**
     * Récupère le nom du fichier à afficher
     */
    async getFileName(data) {
        let signature = await Signature.findOne({ where: { id: data } })
        let path = await Setting.findAll({ limit: 1 })
        let fileName = path[0].dataValues.path + "\\" + signature.htmlFile
        this.setState({ fileName: fileName, id: data })
    }

    /**
     * Supprime la signature sélectionnée
     */
    deleteSignature() {
        SignaturesService.deleteSignature(this.state.id)
        const toDelete = new Set([this.state.id]);
        let updateArray = this.state.finalItems.filter(obj => !toDelete.has(obj.id));
        if (updateArray.length === 0) {
            updateArray[0] = 'rien'
        }
        this.setState({ fileName: '', finalItems: updateArray })
    }

    /**
     * Renvoie sur la page créer signature déjà préremplie
     */
    editSignature() {
        this.props.history.push({
            pathname: '/CreateSign',
            state: {
                id: this.state.id,
                value: -1,
                update: true
            }
        })
    }

    render() {
        const items = this.state.finalItems
        const fileName = this.state.fileName

        if (items[0] == 'rien') {
            return (
                <div>
                    <div>Aucune signature n'a été crée, veuillez </div>
                    <Link to={{
                        pathname: '/CreateSign',
                        state: {
                            value: -1
                        }
                    }}> créer une signature
                    </Link>
                </div>
            )
        } else if (items.length > 0) {
            return (
                <div>
                    <Grid container spacing={1} direction="row" alignItems="center" justify='center'>
                        <Grid item xs={4}>
                            <FilteredList
                                initialItems={items}
                                sendData={this.getFileName}
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                            <div id="sign">
                                <PaperSheet
                                    title=""
                                    height='150px'
                                    justify="space-evenly"
                                    classes='second'
                                >
                                    <DisplaySign
                                        fileName={fileName}
                                    />
                                </PaperSheet>
                            </div>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            {fileName &&
                                <div>
                                    <img onClick={this.deleteSignature} className="btn" src={garbage} />
                                    <img onClick={this.editSignature} className="btn" src={pencil} />
                                </div>
                            }
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (
                <CircularIndeterminate />
            )
        }
    }
}
export default withRouter(SignOverviewPage);