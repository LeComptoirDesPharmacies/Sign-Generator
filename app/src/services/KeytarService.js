'use strict';

const events = require('../../event/event-enum');
const { ipcRenderer } = require('electron');

function saveS3Credentials(identifiant, password) {
    //TODO: Pk un get puis un find ??
    ipcRenderer.on(events.GET_S3_CREDENTIALS, (event, arg) => {
        if (arg[0]) {

        } else {
            ipcRenderer.send(events.SET_S3_CREDENTIALS, identifiant, password)
        }
    });
    ipcRenderer.send(events.FIND_S3_CREDENTIALS)
}

/**
* Récupère les credentials stockés dans Keytar
*/
async function getS3Credentials() {
    var promise = new Promise(function (resolve, reject) {
        ipcRenderer.on('get-credentials', (event, arg) => {
            if (arg[0]) {
                resolve(arg[0])
            }
        });
        ipcRenderer.send('find-credentials');
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