import database from '../data/database';
import { errorHandlers, errors } from '../utils/errors';
import { InternalResponse } from '../utils/responses';
import statusCodes from '../utils/statuses/statusCodes';
import { valueValidators } from '../utils/validators';

const STORES = 'Stores';

// TODO: these permissions helpers may need to be exposed separately to the rest of the system, should modelAction generics not cover all cases

const modelActions = {
  // Requires getAll function to be defined on model
  getAll: async (model, query, returnRawResult = false) => {
    try {
      const result = await database[model].getAll(query);
      return returnRawResult ? result : new InternalResponse(true, result);
    } catch (exception) {
      errorHandlers.throwException(
        `${model.toString()}-getAll`,
        errors.DATABASE_ERROR,
        exception,
      );
    }
  },

  // Requires getAllBy function to be defined on model
  getAllBy: async (model, identifiers, returnRawResult = false) => {
    try {
      const result = await database[model].getAllBy(identifiers);
      return returnRawResult ? result : new InternalResponse(true, result);
    } catch (exception) {
      errorHandlers.throwException(
        `${model.toString()}-getAllBy`,
        errors.DATABASE_ERROR,
        exception,
      );
    }
  },

  // Requires getOne function to be defined on model
  getOne: async (model, identifiers, returnRawResult = false) => {
    let statusCode = statusCodes.OK;
    let error = null;

    try {
      const result = await database[model].getOne(identifiers);

      if (!valueValidators.hasValue(result)) {
        const specificError = {
          code: errors.ENTITY_NOT_FOUND.code,
          message: `${
            errors.ENTITY_NOT_FOUND.message
          } Identifiers ${JSON.stringify(identifiers)}`,
        };

        statusCode = statusCodes.NOT_FOUND;
        error = specificError;
        return returnRawResult
          ? null
          : new InternalResponse(false, null, statusCode, error);
      }

      return returnRawResult
        ? result
        : new InternalResponse(true, result, statusCode, error);
    } catch (exception) {
      errorHandlers.throwException(
        `${model.toString()}-getOne`,
        errors.DATABASE_ERROR,
        exception,
        `Identifiers: ${JSON.stringify(identifiers)}`,
      );
    }
  },

  // Requires doesExistUniqueCode function to be defined on model
  doesExistUniqueCode: async (model, identifiers, returnRawResult = false) => {
    try {
      const result = await database[model].doesExistUniqueCode(identifiers);
      console.log('🚀 ^~^ - doesExistUniqueCode: - result:', result);
      return returnRawResult ? result : new InternalResponse(true, result);
    } catch (exception) {
      errorHandlers.throwException(`${model.toString()}-doesExistUniqueCode`, errors.DATABASE_ERROR, exception, `Identifier: ${JSON.stringify(identifiers)}`);
    }
  },

  // Requires createNew function to be defined on model
  create: async (
    model,
    // id,
    input,
    transaction,
    requiredPermission,
    returnRawResult = false,
  ) => {
    try {
      // const userHasPermission = await hasPermission(id, requiredPermission);
      const userHasPermission = true;
      console.log('🚀 ^~^ - input:', input);

      if (userHasPermission) {
        const result = await database[model].createNew(input);
        valueValidators.mustHaveValue(
          result,
          errors.DATABASE_ERROR,
          'createNew-result',
        );

        return returnRawResult ? result : new InternalResponse(true, result);
      }

      errorHandlers.logError(
        `${model.toString()}-create`,
        errors.INVALID_PERMISSIONS,
        null,
        `UserId: ${JSON.stringify(id)}`,
      );
      return new InternalResponse(
        false,
        null,
        statusCodes.NOT_AUTHORIZED,
        errors.INVALID_PERMISSIONS,
      );
    } catch (exception) {
      errorHandlers.throwException(
        `${model.toString()}-create`,
        errors.DATABASE_ERROR,
        exception,
        `Input: ${JSON.stringify(input)}`,
      );
    }
  },

  // Requires updateExisting function to be defined on model
  update: async (model, identifier, input, transaction) => {
    try {
      const result = await database[model].updateExisting(
        identifier,
        input,
        transaction,
      );

      valueValidators.mustHaveValue(
        result,
        errors.DATABASE_ERROR,
        'updateExisting-result',
      );

      const changeApplied = result[0] > 0;
      if (changeApplied) {
        return new InternalResponse(true, { id: identifier, ...input });
      }

      return new InternalResponse(
        false,
        null,
        statusCodes.NOT_ACCEPTABLE,
        errors.DATABASE_ACTION_NOT_APPLIED,
      );
    } catch (exception) {
      errorHandlers.throwException(
        `${model.toString()}-update`,
        errors.DATABASE_ERROR,
        exception,
        `Identifier: ${JSON.stringify(identifier)} Input: ${JSON.stringify(
          input,
        )}`,
      );
    }
  },

  // Requires doesExist function to be defined on model
  doesExist: async (model, identifiers, returnRawResult = false) => {
    try {
      const result = await database[model].doesExist(identifiers);
      return returnRawResult ? result : new InternalResponse(true, result);
    } catch (exception) {
      errorHandlers.throwException(`${model.toString()}-doesExist`, errors.DATABASE_ERROR, exception, `Identifier: ${JSON.stringify(identifiers)}`);
    }
  },

};
export default modelActions;
