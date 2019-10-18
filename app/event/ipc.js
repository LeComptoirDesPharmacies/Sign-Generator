const keytar = require('keytar');
const { ipcMain } = require('electron');

const events = require('./event-enum');

const S3_SERVICE = 'Sign-Generator-S3';

function init() {
    /* ------ IpcMain ------ */
    ipcMain.on(events.FIND_S3_CREDENTIALS, (event) => {
        keytar.findCredentials(S3_SERVICE).then(data => {
            event.returnValue = data;
            event.sender.send(events.GET_S3_CREDENTIALS, data);
        })
    });

    ipcMain.on(events.DELETE_S3_CREDENTIALS, (events, account) => {
        keytar.deletePassword(S3_SERVICE, account);
    });

    ipcMain.on(events.SET_S3_CREDENTIALS, (event, user, pass) => {
        event.returnValue = keytar.setPassword(S3_SERVICE, user, pass);
    });
}

module.exports = {init};


