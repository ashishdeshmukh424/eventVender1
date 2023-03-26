import { valueValidators } from '../validators';
import { errors } from '../errors';
import statusCodes from '../statuses/statusCodes';

// This is returned when a fatal error has occurred
class ErrorResponse {
  constructor(exception, data, statusCode = null) {
    const errorCode = valueValidators.hasValue(exception.errorCode) ? exception.errorCode : errors.UNIDENTIFIED_ERROR.code;

    this.success = false;
    this.status = valueValidators.hasValue(statusCode) ? statusCode : statusCodes.INTERNAL_SERVER_ERROR;
    this.errorCode = errorCode;
    this.errorMessage = exception.errorMessage;
    this.data = data;
  }
}

export default ErrorResponse;