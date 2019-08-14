'use strict';

const Sequelize = require('sequelize');
var path = require('path'); 
const electron = require('electron');
const configDir =  (electron.app || electron.remote.app).getAppPath();

// Models
const SignatureModel    = require('./model/signature');
const DepartmentModel   = require('./model/department');
const BannerModel       = require('./model/banner');
const SettingModel      = require('./model/setting');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "database.db"
    //storage path for packaging -> path.join(configDir, 'database.db').replace("\app.asar", "")
  });

// Models
const Signature     = SignatureModel(sequelize, Sequelize);
const Department    = DepartmentModel(sequelize, Sequelize);
const Banner        = BannerModel(sequelize, Sequelize);
const Setting       = SettingModel(sequelize, Sequelize);

// Relations
Department.hasMany(Signature);
Banner.hasMany(Department);
Banner.hasMany(Signature);


sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    sequelize,
    Signature,
    Department,
    Banner,
    Setting
};