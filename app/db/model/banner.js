'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('banner', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        name: type.STRING,
        imgUrl: type.STRING,
        redirectUrl: type.STRING
    })
};