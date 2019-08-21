'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('setting', {
        path: type.STRING,
        logo: type.STRING,
        bucketName: type.STRING
    })
};