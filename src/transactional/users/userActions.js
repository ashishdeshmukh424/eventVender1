import database from '../../data/database';
import { valueValidators } from '../../utils/validators';
import { ErrorResponse, FailureResponse, SuccessResponse, getResponse } from '../../utils/responses';
import { errorHandlers, errors } from '../../utils/errors';
import modelActions from '../modelActions';
import { encrypt } from '../../utils/crypto/encrypt';



const USERS = 'Users';
const USERGROUPS = 'UserGroups';

const userActions = {
  getAllUsers: async (query) => {
    try {
      const response = await database[USERS].getAllByPaginated({ isDeleted: false }, null);
      console.log('🚀 ^~^ - getAllUsers: - response:', response);
      // const encryptUser = encrypt(JSON.stringify(response));

      return new SuccessResponse(response);
    } catch (exception) {
      // eslint-disable-next-line
          console.debug(exception);
      return new ErrorResponse(exception);
    }
  },


  getUserByEmail: async (email) => {
    try {
      const user = await database.Users.getOneByEmailOrPhone(email);
      const encryptUser = encrypt(JSON.stringify(user));

      if (!valueValidators.hasValue(user)) {
        return new FailureResponse(errors.USER_NOT_FOUND);
      }

      return new SuccessResponse(encryptUser);
    } catch (exception) {
      // eslint-disable-next-line
      console.debug(exception);
      errorHandlers.throwException('getUserByEmail', errors.DATABASE_ERROR, exception, `Identifier: ${JSON.stringify(email)}`);
      return new ErrorResponse(exception);
    }
  },

  updateUser: async (userId, id, updatedUserDetails) => {
    const transaction = await database.sequelize.transaction();

    try {
      const userFromDb = await modelActions.getOne(USERS, { id }, true);

      const { cellphone, code, extension } = updatedUserDetails; // code
      if (code) {
        const userExists = await modelActions.doesExist(USERS, { code });
        if (userExists.data) {
          return new FailureResponse(errors.USER_UNIQUE_CODE_EXISTS);
        }
      }

      if (cellphone && cellphone !== userFromDb.cellphone) {
        const userExists = await modelActions.getOne(USERS, { cellphone }, true);
        if (userExists && userExists.id !== updatedUserDetails.id) {
          return new FailureResponse(errors.USER_CELLPHONE_EXISTS);
        }
      }

      if (extension) {
        const userExists = await modelActions.doesExist(USERS, { extension });
        if (userExists.data) {
          return new FailureResponse(errors.USER_EXTENSION_EXISTS);
        }
      }

      const response = await modelActions.update(USERS, id, updatedUserDetails, transaction);
      const encryptUser = encrypt(JSON.stringify(response));

      await transaction.commit();

      return new SuccessResponse(encryptUser);
    } catch (exception) {
      await transaction.rollback();
      // eslint-disable-next-line
      console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

  getOneUserById: async (id) => {
    try {
      const response = await modelActions.getOne(USERS, { id }, false);

      return getResponse(response);
    } catch (exception) {
      // eslint-disable-next-line
      console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

  deleteUser: async (userId, identifier) => {
    const transaction = await database.sequelize.transaction();

    try {
      const response = await modelActions.update(USERS, identifier, { isDeleted: true, deletedAt: new Date() }, transaction);
      const encryptUser = encrypt(JSON.stringify(response));

      await transaction.commit();
      return new SuccessResponse(encryptUser);
    } catch (exception) {
      await transaction.rollback();
      // eslint-disable-next-line
      console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

  // ///////
  getUsersLogin: async (email) => {
    console.log('🚀 ^~^ - getUsersLogin: - email:', email);
    try {
      const user = await database.Users.getOne(email);
      console.log('🚀 ^~^ - getUsersLogin: - user:', user);
      // const encryptUser = encrypt(JSON.stringify(user));

      if (!valueValidators.hasValue(user)) {
        return new FailureResponse(errors.USER_NOT_FOUND);
      }

      if (user && email.password !== user.password) return new FailureResponse(errors.INCORRECT_PASSWORD);

      return new SuccessResponse(user);
    } catch (exception) {
      // eslint-disable-next-line
      console.debug(exception);
      errorHandlers.throwException('getUserByEmail', errors.DATABASE_ERROR, exception, `Identifier: ${JSON.stringify(email)}`);
      return new ErrorResponse(exception);
    }
  },

  createUser: async (newUserDetails) => {
    const transaction = await database.sequelize.transaction();

    try {
      const { name, email, phoneNumber, password } = newUserDetails;

      // check if user exists
      // const userUniqeCodeExists = await modelActions.doesExistUniqueCode(USERS, { phoneNumber, email });
      // if (userUniqeCodeExists.data) {
      //   return new FailureResponse(errors.USER_UNIQUE_CODE_EXISTS);
      // }

      // const userExists = await modelActions.doesExist(USERS, { phoneNumber, email, password });
      // if (userExists.data) {
      //   return new FailureResponse(errors.USER_ALREADY_EXISTS);
      // }

      console.log('🚀 ^~^ - createUser: - newUserDetails:', newUserDetails);

      const response = await modelActions.create(USERS, newUserDetails);
      const encryptUser = encrypt(JSON.stringify(response));

      await transaction.commit();

      return new SuccessResponse(response);
    } catch (exception) {
      await transaction.rollback();
      // eslint-disable-next-line
      console.debug(exception);
      return new ErrorResponse(exception);
    }
  },

};

export default userActions;
