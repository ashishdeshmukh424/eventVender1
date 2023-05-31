import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import cors from 'koa-cors';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import config from './../config';
import users from '../routes/users';
import fetchEmail from '../routes/fetchEmail';


const { basePath, port, bindAddress, sessionSecret } = config.webServer;
console.log('🚀 ^~^ - port:', port);

const app = new Koa();

const options = {
  origin: true,
  credentials: true,
  allowHeaders: 'origin, content-type, accept, authorization',
  allowMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
};

const limit = '10mb';
const api = {
  async initApi() {
    app.proxy = true;
    // app.keys = [sessionSecret];
    app
      .use(cors(options))
      .use(helmet())
      .use(koaBody({ formLimit: limit, jsonLimit: limit, textLimit: limit }))
      // .use(mount(`/${basePath}/users`, users))
      .use(mount(`/${basePath}/fetchEmail`, fetchEmail))

      .listen(port, bindAddress);
  },
};

export default api;
