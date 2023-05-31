const customEnv = require('custom-env');
const crypto = require('crypto-js');

const decrypt = (text) => {
  const bytes = crypto.AES.decrypt(text, 'FHRVr+XvNJh@3N$$wV_m7ujVp2#G5n2f');
  return bytes.toString(crypto.enc.Utf8);
};

customEnv.env(process.env.NODE_ENV);

// developer db
const config = {
  username: 'postgres',
  host: 'localhost',
  database: 'ART_3rd',
  password: 'Winjit@1234',
  port: 5432,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  sequelizeLogsEnabled: false,
};


module.exports = config;
