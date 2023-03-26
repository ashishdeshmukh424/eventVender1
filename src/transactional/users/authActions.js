import database from '../../data/database';
import { encrypt } from '../../utils/crypto/encrypt';
import { errors } from '../../utils/errors';
import { ErrorResponse, FailureResponse, SuccessResponse } from '../../utils/responses';
import statusCodes from '../../utils/statuses/statusCodes';
import { valueValidators } from '../../utils/validators';
import Authentication from './authentication';

const SESSIONS = 'Sessions';

const userAuth = {

  authenticateByCode: async (code, rpadmin = false) => {
    try {
      valueValidators.mustHaveValue(code, errors.INVALID_REQUEST, 'code');

      const userFromDb = await database.Users.getOneByCode(code);

      if (!valueValidators.hasValue(userFromDb)) return new FailureResponse(errors.USER_NOT_FOUND, statusCodes.BAD_REQUEST);

      const auth = new Authentication(userFromDb, '', false);
      if (auth.authenticated) {
        const responceData = encrypt(JSON.stringify(auth));
        return new SuccessResponse(responceData);
      }
      return new FailureResponse(errors.USER_AUTH_ERROR, statusCodes.NOT_AUTHORIZED);
    } catch (exception) {
      // eslint-disable-next-line
      console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

};

export default userAuth;
