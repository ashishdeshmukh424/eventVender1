import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import cors from 'koa-cors';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
// import { swaggerDoc, apiSpec } from 'swagger-json';
import config from './../config';
import users from '../routes/users';
import userLocationDetails from '../routes/userLocationDetails';

// import auth from '../routes/auth';



const { basePath, port, bindAddress, sessionSecret } = config.webServer;
console.log('🚀 ^~^ - port:', port);
const swStats = require('swagger-stats');
const e2k = require('express-to-koa');
const { ui, validate } = require('swagger2-koa');
const swagger = require('swagger2');

// const swaggerDocument = swagger.loadDocumentSync('swagger.json');

const app = new Koa();

const options = {
  origin: true,
  credentials: true,
  allowHeaders: 'origin, content-type, accept, authorization',
  allowMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
};

const limit = '10mb';
// app.use(e2k(swStats.getMiddleware({ swaggerSpec: swaggerDoc })));
const api = {
  async initApi() {
    app.proxy = true;
    // app.keys = [sessionSecret];
    app
      .use(cors(options))
      .use(helmet())
      .use(koaBody({ formLimit: limit, jsonLimit: limit, textLimit: limit }))
      .use(mount(`/${basePath}/users`, users))
      .use(mount(`/${basePath}/userLocationDetails`, userLocationDetails))
      .listen(port, bindAddress);
  },
};
// console.log('port===>', port);

export default api;
