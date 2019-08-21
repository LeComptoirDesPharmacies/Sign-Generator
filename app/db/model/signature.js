'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('signature', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
            allowNull: false
        },
        lastName: type.STRING,
        firstName: type.STRING,
        email: {
            type: type.STRING,
            validate: {
                isEmail: true
            }
        },
        phone: type.STRING,
        position: type.STRING
    },{
        getterMethods: {
            htmlFile: function() {
                return this.getDataValue("firstName") + '_' + this.getDataValue("lastName") + '_' + this.getDataValue("id") + ".html"
            },
            fullName: function() {
                return this.getDataValue("firstName") + ' ' + this.getDataValue("lastName")
            }
        }
    })
};