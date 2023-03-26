import compose from 'koa-compose';
import koaRouter from 'koa-router';
import userActions from '../transactional/users/userActions';
import database from '../data/database';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../utils/responses';

const path = require('path');

export const createUserLocationDetails = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    const response = await database.UserLocationDetails.getAll();
    console.log('🚀 ^~^ - router.get - response:', response);
    ctx.status = response.status;
    ctx.body = response;
  });


  router.put('/:userId', async (ctx) => {
    const response = await userActions.updateUser(ctx.state.userId, ctx.params.userId, ctx.request.body);

    ctx.status = response.status;
    ctx.body = response;
  });

  router.post('/', async (ctx) => {
    console.log("ctx.request.body", ctx.request.body);
    const transaction = await database.sequelize.transaction();

    const response = await database.UserLocationDetails.createNew(ctx.request.body);
    await transaction.commit();
    const resp = new SuccessResponse(response);
    ctx.status = resp.status;
    ctx.body = resp;
  });

  router.delete('/:userId', async (ctx) => {
    const response = await userActions.deleteUser(ctx.state.userId, ctx.params.userId);

    ctx.status = response.status;
    ctx.body = response;
  });


  return router;
};



const storeServiceRouter = createUserLocationDetails();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
