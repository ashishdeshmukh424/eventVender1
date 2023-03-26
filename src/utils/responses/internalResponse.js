import statusCodes from '../statuses/statusCodes';

class InternalResponse {
  constructor(success, result, statusCode = statusCodes.OK, error = null) {
    this.success = success;
    this.data = result;
    this.error = error;
    this.status = statusCode;
  }
}

export default InternalResponse;