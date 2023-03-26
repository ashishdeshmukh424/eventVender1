const customEnv = require('custom-env');
const crypto = require('crypto-js');

const decrypt = (text) => {
  const bytes = crypto.AES.decrypt(text, 'FHRVr+XvNJh@3N$$wV_m7ujVp2#G5n2f');
  return bytes.toString(crypto.enc.Utf8);
};

customEnv.env(process.env.NODE_ENV);

const config = {
  host: 'localhost',
  port: '3306',
  database: 'shivansh',
  dialect: 'mysql',
  username: 'root',
  password: 'Winjit@1234',
  seederStorage: 'sequelize',
  operatorsAliases: false,
  sequelizeLogsEnabled: false, // (process.env.SEQUELIZE_LOGS_ENABLED && JSON.parse(decrypt(process.env.SEQUELIZE_LOGS_ENABLED))),
};


module.exports = config;
