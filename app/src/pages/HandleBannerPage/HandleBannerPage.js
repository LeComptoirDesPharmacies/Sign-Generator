import React, { Component, forwardRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CircularIndeterminate from "../../components/loader/circularIndeterminate"
import Grid from '@material-ui/core/Grid';
import FilteredList from "../../components/filteredList/filteredList"
import { MyInputText } from "../../components/inputs/input"
import Menu from "../../components/menu/menu"
import "./HandleBannerPage.scss"
import { MyListIcon } from "../../components/list/listIcon"
import garbage from "../../../assets/img/bin.png"
import pencil from "../../../assets/img/pencil.png"
import check from "../../../assets/img/check.png"
import SimpleCard from "../../components/cards/cards"
import Form from "../../components/forms/form"
import SignatureFile from "../../services/CreateHtmlFile"
import { Banner, Department, Signature, Setting } from "../../../db"
import BannerService from "../../services/BannerService"
import DepartmentService from "../../services/DepartmentsService"
import SignaturesService from '../../services/SignaturesService';
import FileDelete from "../../domain/fileDelete"

//Page de configuration
class HandleBannerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalItems: [],
            banner: {},
            currentBanner: {},
            fileName: '',
            selectedOption: null,
            options: [],
            bannerDepartment: [],
            isEdit: false,
            changeBannerUrl: '',
            isPencil: true
        }

        this.foundCurrentBanner = this.foundCurrentBanner.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getData = this.getData.bind(this)
        this.deleteBanner = this.deleteBanner.bind(this)
        this.editSignature = this.editSignature.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.editBannerUrl = this.editBannerUrl.bind(this)
    }

    async componentWillMount() {
        let items = await Banner.findAll({
            attributes: ["name", "id", "imgUrl", "redirectUrl"],
            raw: true
        })
        if (items.length > 0) {
            this.setState({ banner: items })
        } else {
            this.setState({ banner: ['rien'] })
            return;
        }
    }

    async foundCurrentBanner(data) {
        var found = this.state.banner.find(element => {
            if (element.id == data) {
                return element
            }
        });
        await this.setState({ currentBanner: found })
        await this.getAllAttribution()
    }

    async saveBannerId(selectedOption) {
        let signatures = await DepartmentService.isDepartmentExist(selectedOption.value).then(async department => {
            department.bannerId = this.state.currentBanner.id
            await department.save();
            const signatures = await SignaturesService.getSignatureWithDepartment(department.dataValues.id)
            return signatures
        }, async err => {
            let signature = await Signature.findOne({ where: { id: selectedOption.value } });
            signature.bannerId = this.state.currentBanner.id;
            await signature.save();
            return [signature]
        })
        return signatures
    }

    async rewriteSignature(signature) {
        let settings = await Setting.findAll({ limit: 1 })
        let signatureFile = new SignatureFile(signature, settings[0].dataValues, signature.departmentId)
        signatureFile.buildHtmlFile()
    }

    async getAllAttribution() {
        const name = await Signature.findAll({ where: { bannerId: this.state.currentBanner.id } })
        const department = await Department.findAll({ where: { bannerId: this.state.currentBanner.id } })
        this.setState({ bannerDepartment: department.concat(name) })
    }

    async handleChange(selectedOption) {
        this.setState({ selectedOption });
        if (this.state.currentBanner) {
            const signatures = await this.saveBannerId(selectedOption)
            signatures.map(signature => {
                this.rewriteSignature(signature)
            })
            await this.getAllAttribution()
        }
    };

    componentDidMount() {
        this.getOptions()
    }

    async getOptions() {
        let department = await DepartmentService.getAllDepartmentName()
        department = department.concat(await SignaturesService.getAllName())
        if (department.length == 0) {
            this.setState({ options: ["salut"] })
        }
        this.setState({ options: department })
    }

    onSelect = forwardRef((props, ref) => (
        <div ref={ref} onMouseDown={this.getData} {...props} />
    ));

    async deleteBannerOnS3() {
        let fileDelete = new FileDelete(this.state.currentBanner.imgUrl)
        fileDelete.deleteBannerOnS3()
    }

    async deleteDepartment(id) {
        await DepartmentService.deleteDepartmentBannerId(id)
        await SignaturesService.deleteSignatureBannerId(id)
        let signatures = await DepartmentService.isDepartmentExist(id).then(async department => {
            return (await SignaturesService.getSignatureWithDepartment(department.dataValues.id))
        }, async err => {
            return (await Signature.findAll({ where: { id: id } }))
        })
        signatures.map(signature => {
            this.rewriteSignature(signature)
        })
        await this.getAllAttribution()
    }

    getData(event) {
        let value = event.target.attributes.getNamedItem('data-key').value
        this.deleteDepartment(value)
    }

    async getSignaturesIdToDelete() {
        let signaturesIds = await SignaturesService.getSignatureWithBannerId(this.state.currentBanner.id)
        let departmentsIds = await DepartmentService.getDepartmentIdWithBannerId(this.state.currentBanner.id)
        let signatureDepartment = ''
        if (departmentsIds) {
            signatureDepartment = await SignaturesService.getSignatureWithDepartment(departmentsIds.dataValues.id)
        }
        return signaturesIds.concat(signatureDepartment)
    }

    async updateEverything() {
        let banner = ''
        banner = await Banner.findAll({
            attributes: ["name", "id", "imgUrl", "redirectUrl"],
            raw: true
        })
        if (banner.length == 0) {
            banner[0] = "rien"
        }
        this.setState({ banner: banner, options: '', bannerDepartment: '' })
        this.getOptions()
    }

    async deleteBanner() {
        if (this.state.currentBanner.id) {
            this.deleteBannerOnS3(this.state.currentBanner.id)
            let signatures = await this.getSignaturesIdToDelete()
            await BannerService.deleteBanner(this.state.currentBanner.id)
            signatures.map(async signature => {
                await SignaturesService.deleteSignatureBannerId(this.state.currentBanner.id)
                await DepartmentService.deleteDepartmentBannerId(this.state.currentBanner.id)
                this.rewriteSignature(signature)
            })
            this.updateEverything()
        }
    }

    editSignature() {
        this.setState({ isEdit: !this.state.isEdit, isPencil: !this.state.isPencil })
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async editBannerUrl(event) {
        event.preventDefault();
        BannerService.saveBannerRedirectUrl(this.state.currentBanner.id, this.state.changeBannerUrl)
        this.setState(prevState => ({
            currentBanner: {
                ...prevState.currentBanner,
                redirectUrl: this.state.changeBannerUrl
            }
        }))
        this.editSignature()
    }

    render() {
        const items = this.state.banner
        const options = this.state.options
        const redirectUrl = this.state.currentBanner.redirectUrl
        const bannerDepartment = this.state.bannerDepartment

        if (items[0] == 'rien') {
            return (
                <div>Merci <Link to={{
                    pathname: '/UploadBanner',
                    state: {
                        value: -2
                    }
                }}> d'importer
                </Link> un bandeau</div>
            )
        }
        else if (items.length && options.length > 0) {
            return (
                <div>
                    <Grid container spacing={1} direction="row" alignItems="center" justify='center'>
                        <Grid item xs={4}>
                            <FilteredList
                                initialItems={items}
                                sendData={this.foundCurrentBanner}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            {this.state.currentBanner.id ?
                                <>
                                    <div className="sign">
                                        <SimpleCard classes="cardSign">
                                            <Grid container spacing={1} alignItems="center" justify='center'>
                                                <Grid item xs={12} align="center">
                                                    <img className="banner" src={this.state.currentBanner.imgUrl} />
                                                </Grid>
                                            </Grid>
                                        </SimpleCard>
                                    </div>
                                    <div className="sign">
                                        <Menu
                                            handleChange={this.handleChange}
                                            selectedOption={this.state.selectedOption}
                                            options={options}
                                        />
                                    </div>
                                </> :
                                <SimpleCard classes="cardSign">
                                    <Grid container spacing={1} alignItems="center" justify='center'>
                                        <Grid item xs={12} align="center">
                                            <div>Merci de choisir un bandeau</div>
                                        </Grid>
                                    </Grid>
                                </SimpleCard>
                            }
                            {redirectUrl &&
                                <SimpleCard classes='simpleCard'>
                                    <Grid container spacing={0} direction="row" alignItems="center" justify='center'>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={9} align="center">
                                            {this.state.isEdit ?
                                                <Form
                                                    submit={this.editBannerUrl}
                                                >
                                                    <MyInputText
                                                        value={this.state.changeBannerUrl}
                                                        fullWidth={true}
                                                        handleChange={this.handleInputChange}
                                                        name="changeBannerUrl"
                                                    />
                                                </Form> :
                                                <div className="banner_url">{redirectUrl}</div>
                                            }
                                        </Grid>
                                        <Grid item xs={1} align="center">
                                            {this.state.isPencil ?
                                                <img onClick={this.editSignature} className="btn_handle" src={pencil} /> :
                                                <img onClick={this.editBannerUrl} className="btn_handle" src={check} />
                                            }
                                        </Grid>
                                    </Grid>
                                </SimpleCard>
                            }
                        </Grid>
                        <Grid container spacing={1} direction="row" alignItems="center" justify='center'>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3} align="center">
                                {bannerDepartment &&
                                    <>
                                        <MyListIcon
                                            items={bannerDepartment}
                                            getData={this.onSelect}
                                        />
                                    </>
                                }
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={1} align="center">
                                {redirectUrl &&
                                    <img onClick={this.deleteBanner} className="btn_handle garbage" src={garbage} />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div >
            );
        } else {
            return (
                <CircularIndeterminate />
            )
        }
    }
}
export default withRouter(HandleBannerPage);