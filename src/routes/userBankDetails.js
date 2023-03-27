import compose from 'koa-compose';
import koaRouter from 'koa-router';
import userActions from '../transactional/users/userActions';
import database from '../data/database';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../utils/responses';

const path = require('path');

export const createUserBankDetails = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    const transaction = await database.sequelize.transaction();

    const response = await database.UserBankDetails.getAll();
    await transaction.commit();
    const resp = new SuccessResponse(response);
    ctx.status = resp.status;
    ctx.body = resp;
  });



  router.post('/', async (ctx) => {
    console.log("ctx.request.body", ctx.request.body);
    const transaction = await database.sequelize.transaction();

    const response = await database.UserBankDetails.createNew(ctx.request.body);
    await transaction.commit();
    const resp = new SuccessResponse(response);
    console.log('🚀 ^~^ - router.post - resp:', resp)
    ctx.status = resp.status;
    ctx.body = resp;
  });

  router.delete('/:userId', async (ctx) => {
    const response = await userActions.deleteUser(ctx.request.body.userId, ctx.request.body.userId);

    ctx.status = response.status;
    ctx.body = response;
  });


  return router;
};



const storeServiceRouter = createUserBankDetails();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
