'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('department', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        name: type.STRING,
    })
};
  