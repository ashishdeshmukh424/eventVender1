import Sequelize from 'sequelize';

import users from './models/users/user';
import userOTPDetails from './models/users/userOTPDetails';
import userBankDetails from './models/users/userBankDetails';
import userGSTDetails from './models/users/userGSTDetails';
import userLocationDetails from './models/users/userLocationDetails';
import userSupplierDetails from './models/users/userSupplierDetails';
import catalogSubcategory from './models/catalog/catalogSubcategory';
import userCatalogDetails from './models/catalog/userCatalogDetails';
import catalogCategory from './models/catalog/catalogCategory';
import availableServices from './models/availableServices/availableServices';
import config from './dbConfig';

const {
  host,
  port,
  database,
  username,
  password,
  dialect,
  sequelizeLogsEnabled,
} = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  operatorsAliases: false,
  timezone: '+02:00',
  // FIXME:
  dialectOptions: {
    // for reading data from db and appyling the correct time zone
    typeCast(field, next) {
      if (
        field.type === 'DATETIME' ||
        field.type === 'TIMESTAMP' ||
        field.type === 'DATE' ||
        field.type === 'TIME'
      ) {
        return new Date(`${field.string()}Z`);
      }
      return next();
    },
    connectTimeout: 240000,
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    multipleStatements: true,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 30,
    min: 0,
    idle: 10000,
    acquire: 240000,
  },
  logging: sequelizeLogsEnabled, // disable sequelize query logging
});

const db = {
  sequelize,
  Sequelize,
};

// #region USERS

db.Users = sequelize.import('users', users);
db.UserOTPDetails = sequelize.import('userOTPDetails', userOTPDetails);
db.UserBankDetails = sequelize.import('userBankDetails', userBankDetails);
db.UserGSTDetails = sequelize.import('userGSTDetails', userGSTDetails);
db.UserLocationDetails = sequelize.import('userLocationDetails', userLocationDetails);
db.UserSupplierDetails = sequelize.import('userSupplierDetails', userSupplierDetails);

db.CatalogCategory = sequelize.import('catalogCategory', catalogCategory);
db.CatalogSubcategory = sequelize.import('catalogSubcategory', catalogSubcategory);
db.UserCatalogDetails = sequelize.import('userCatalogDetails', userCatalogDetails);

db.AvailableServices = sequelize.import('availableServices', availableServices);


// #end user activity audit

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
