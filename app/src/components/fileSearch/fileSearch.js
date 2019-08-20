import React from 'react'
import Files from './files'
import CustomizedSnackbars from "../modalMessage/modalMessage"
import { withRouter, Link } from 'react-router-dom';
import settingService from "../../services/SettingService"
import BannerService from "../../services/BannerService"
import FileUpload from "../../domain/fileUpload"

class FileSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            message: '',
            open: true,
            variant: ''
        }
        this.setOpen = this.setOpen.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this)
        this.filesUpload = this.filesUpload.bind(this)
    }

    /**
     * Si aucun fichier n'est présent affiche un message d'erreur, appelle filesUpload si tout est bon
     */
    onFilesChange = (files) => {
        this.setState({ files })
        console.log("jen ai trop marre")
        if (files[0] == undefined) {
            this.setState({
                message: "Le type de fichier n'est pas supporter.",
                open: true,
                variant: "error"
            })
            return;
        }
        this.filesUpload(files)
    }

    /**
     * Affiche un message d'erreur si je le type du fichier n'est pas bon
     */
    onFilesError = (error, file) => {
        console.log("on sait jamais")
        this.setState({
            message: "error code " + error.code + ": " + error.message,
            open: true,
            variant: "error"
        })
    }

    /**
     * Permet de supprimer un fichier
     */
    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    setTheState(obj) {
        this.setState({
            password: obj.password,
            identifiant: obj.account
        })
    }

    /**
     * Upload le fichier choisi sur le S3
     */
    async filesUpload(files) {
        const file = files[0];
        const uploadFile = new FileUpload(file, this.props.fileName)
        console.log("pour commencer")
        await uploadFile.uploadFileToS3().then(async data => {
            if (this.props.redirect == true) {
                console.log("ici?")
                await BannerService.saveBannerImgUrl(this.props.banner, data.Location)
                await this.sleep(2000);
                this.props.history.push({
                    pathname: '/UploadBanner',
                    state: {
                        value: 7
                    }
                })
            } else {
                console.log("non en fait ci")
                settingService.createOrUpdateLogo(data.Location)
            }
        })
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setOpen(open) {
        this.setState({ open })
    }

    render() {
        const { message, files } = this.state;
        return (
            <div>
                <div>
                    {message && <CustomizedSnackbars
                        key={message}
                        variant={this.state.variant}
                        message={message}
                        setOpen={this.setOpen}
                        open={this.state.open}
                    />}
                </div>
                <Files
                    ref='files'
                    className='files-dropzone-gallery'
                    onChange={this.onFilesChange}
                    onError={this.onFilesError}
                    accepts={['image/*']}
                    multiple={false}
                    clickable
                >
                    {
                        this.state.files.length > 0
                            ? <div className='files-gallery'>
                                {this.state.files.map((file) =>
                                    <img className='files-gallery-item' src={file.preview.url} key={file.id} />
                                )}
                            </div>
                            : <div className="text-dropzone">Drop une image ou cliquer pour ouvrir l'explorateur de fichier</div>
                    }
                </Files>
            </div >
        )
    }
}

export default withRouter(FileSearch);