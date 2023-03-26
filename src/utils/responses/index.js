import ErrorResponse from './errorResponse';
import InternalResponse from './internalResponse';
import FailureResponse from './failureResponse';
import SuccessResponse from './successResponse';
import { responseMessages } from './responseMessages';

const getResponse = (internalResponse) => {
  if (internalResponse.success) {
    return new SuccessResponse(internalResponse.data);
  }

  return new FailureResponse(internalResponse.error, internalResponse.status, internalResponse.data);
};

export { getResponse, ErrorResponse, InternalResponse, FailureResponse, SuccessResponse, responseMessages };
