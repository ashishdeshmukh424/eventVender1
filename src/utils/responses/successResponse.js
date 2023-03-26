import statusCodes from '../statuses/statusCodes';
import { valueValidators } from '../validators';

// This is returned when a request has executed successfully to completion
class SuccessResponse {
  constructor(data, status = statusCodes.OK) {
    this.success = true;
    this.status = status;
    this.data = valueValidators.hasValue(data) ? data : null;
  }
}

export default SuccessResponse;