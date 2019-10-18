'use strict';

const events = require('../../event/event-enum');
const { ipcRenderer } = require('electron');

function saveS3Credentials(identifiant, password) {
    getS3Credentials().then( async credential => {
        if(credential != null){
            ipcRenderer.send(events.DELETE_S3_CREDENTIALS, credential.account)
        }
        ipcRenderer.send(events.SET_S3_CREDENTIALS, identifiant, password)
    });
}

/**
* Récupère les credentials stockés dans Keytar
*/
async function getS3Credentials() {
    var promise = new Promise(function (resolve, reject) {
        ipcRenderer.on(events.GET_S3_CREDENTIALS, (event, arg) => {
            if (arg[0]) {
                resolve(arg[0])
            }
        });
        ipcRenderer.send(events.FIND_S3_CREDENTIALS);
    }, 2000);
    let obj = null
    await promise.then(function (data) {
        obj = data
        return obj
    });
    return obj
}

const keytarServiceFactory = () => ({
    saveS3Credentials,
    getS3Credentials
});

export default keytarServiceFactory();