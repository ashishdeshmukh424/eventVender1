import compose from 'koa-compose';
import koaRouter from 'koa-router';
import userActions from '../transactional/users/userActions';

const path = require('path');

export const createUserRoutes = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    const response = await userActions.getAllUsers(ctx.request.query);
    ctx.status = response.status;
    ctx.body = response;
  });

  router.get('/login', async (ctx) => {
    const response = await userActions.getUsersLogin(ctx.request.body);
    ctx.status = response.status;
    ctx.body = response;
  });

  router.get('/otp', async (ctx) => {
    let response;
    if (ctx.request.body.otp === 1111) {
      response = {
        success: true,
        status: 200,
        data: {
          otp: 1111,
        },
      };
    } else {
      response = {
        success: false,
        status: 406,
        errorCode: 'ENTIMP12',
        errorMessage: 'OTP not generated',
        data: null,
      };
    }
    // const response = await userActions.getUsersLogin(ctx.request.body);
    ctx.status = response.status;
    ctx.body = response;
  });

  router.get('/email/:userEmail', async (ctx) => {
    const response = await userActions.getUserByEmail(ctx.params.userEmail);

    ctx.status = response.status;
    ctx.body = response;
  });

  router.put('/:userId', async (ctx) => {
    const response = await userActions.updateUser(ctx.state.userId, ctx.params.userId, ctx.request.body);

    ctx.status = response.status;
    ctx.body = response;
  });

  router.post('/', async (ctx) => {
    const response = await userActions.createUser(ctx.request.body);
    ctx.status = response.status;
    ctx.body = response;
  });

  router.delete('/:userId', async (ctx) => {
    const response = await userActions.deleteUser(ctx.state.userId, ctx.params.userId);

    ctx.status = response.status;
    ctx.body = response;
  });


  return router;
};



const storeServiceRouter = createUserRoutes();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
