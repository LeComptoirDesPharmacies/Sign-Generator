'use strict';

import { Setting } from '../../db'

function isExist(property){
    return Setting.findAll({attributes: [property], limit: 1})
        .then(settings => {
            if (settings.length > 0)
                return settings[0].getDataValue(property) != null;
            return false;
        });
}

async function isPathFill() {
    return isExist('path');
}

async function isS3Ready() {
    return isExist('bucketName');
}

async function isLogoExist() {
    return isExist('logo');
}

function createOrUpdateSettings(obj){
    return Setting.findAll({ limit: 1 })
        .then(settings => {
            if(settings.length > 0){
                settings[0].update(obj);
            } else {
                Setting.create(obj);
            }
        })
}

function createOrUpdateBucketName(bucketName) {
    const obj = {'bucketName': bucketName};
    return createOrUpdateSettings(obj);
}

function createOrUpdatePath(path) {
    const obj = {'path': path};
    return createOrUpdateSettings(obj);
}

function createOrUpdateLogo(logo) {
    const obj = {'logo': logo};
    return createOrUpdateSettings(obj);
}

const SettingServiceFactory = () => ({
    isPathFill,
    isS3Ready,
    createOrUpdateBucketName,
    createOrUpdatePath,
    isLogoExist,
    createOrUpdateLogo
});

export default SettingServiceFactory();