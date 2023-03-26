import { errorHandlers, errors } from '../errors';

import statusCodes from '../statuses/statusCodes';
import { valueValidators } from '../validators';

// This is returned for a graceful failure, typically for validation requirements not met
class FailureResponse {
  constructor(error, statusCode = null, data = null) {
    const errorCode = valueValidators.hasValue(error) ? error.code : errors.UNIDENTIFIED_ERROR.code;

    this.success = false;
    this.status = valueValidators.hasValue(statusCode) ? statusCode : statusCodes.NOT_ACCEPTABLE;
    this.errorCode = errorCode;
    this.errorMessage = errorHandlers.extractErrorMessage(errorCode);
    this.data = data;
  }
}

export default FailureResponse;
