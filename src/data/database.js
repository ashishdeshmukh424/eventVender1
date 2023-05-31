import Sequelize from 'sequelize';

import MstUsers from './models/MstUsers/MstUsers';
import logS1 from './models/logS1/logS1';
import transactions from './models/transactions/transactions';
import UserTokens from './models/userToken/userToken';
import mstBankEmails from './models/mstBankEmails/mstBankEmails';
import mstBanks from './models/mstBank/mstBanks';
import config from './dbConfig';
import trnAccounts from './models/trnAccounts/trnAccounts';
import MstAccountTypes from './models/MstAccountTypes/MstAccountTypes';

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
  timezone: '+05:30',
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

db.Transactions = sequelize.import('transactions', transactions);
db.TrnAccounts = sequelize.import('trnAccounts', trnAccounts);
db.MstAccountTypes = sequelize.import('MstAccountTypes', MstAccountTypes);
db.UserTokens = sequelize.import('UserTokens', UserTokens);
db.LogS1 = sequelize.import('logS1', logS1);
db.MstUsers = sequelize.import('MstUsers', MstUsers);
db.MstBankEmails = sequelize.import('mstBankEmails', mstBankEmails);
db.MstBanks = sequelize.import('mstBanks', mstBanks);




// #end user activity audit

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
