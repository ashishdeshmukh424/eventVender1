const customEnv = require('custom-env');
const { decrypt } = require('./utils/crypto');

customEnv.env(process.env.NODE_ENV);
const config = {
  webServer: {
    basePath: decrypt(process.env.BASE_PATH),
    bindAddress: decrypt(process.env.BIND_ADDRESS),
    port: 5001, // decrypt(process.env.PORT),
    sessionSecret: decrypt(process.env.SESSION_SECRET),
  },
};

module.exports = config;
