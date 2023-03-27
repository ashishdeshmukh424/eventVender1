import compose from 'koa-compose';
import koaRouter from 'koa-router';
import userActions from '../transactional/users/userActions';
import database from '../data/database';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../utils/responses';

const path = require('path');

export const createUserCatalogDetails = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    const transaction = await database.sequelize.transaction();

    const response = await database.UserCatalogDetails.getAll(ctx.request.body.userId);
    await transaction.commit();
    const resp = new SuccessResponse(response);
    ctx.status = resp.status;
    ctx.body = resp;
  });



  router.post('/', async (ctx) => {
    const transaction = await database.sequelize.transaction();

    const response = await database.UserCatalogDetails.createNew(ctx.request.body);
    await transaction.commit();
    const resp = new SuccessResponse(response);
    ctx.status = resp.status;
    ctx.body = resp;
  });

  // router.delete('/:userId', async (ctx) => {
  //   const response = await userActions.deleteUser(ctx.request.body.userId, ctx.request.body.userId);

  //   ctx.status = response.status;
  //   ctx.body = response;
  // });


  return router;
};



const storeServiceRouter = createUserCatalogDetails();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
