import compose from 'koa-compose';
import koaRouter from 'koa-router';
import fetchEmailAction from '../transactional/fetchEmail/fetchEmailAction';
import { readEmails } from '../transactional/readEmails/readEmails';
import { regenerateAccessToken } from '../bussiness/regenerateAccessToken';
const path = require('path');

export const createFetchEmailRoutes = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    // const asscessToken = await regenerateAccessToken();
    readEmails()
  });

  return router;
};



const storeServiceRouter = createFetchEmailRoutes();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
