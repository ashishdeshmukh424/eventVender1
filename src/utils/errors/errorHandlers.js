/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { errors, Exception } from './';

const extractErrorMessage = (errorCode) => {
  for (const key in errors) {
    const pair = errors[key];
    if (pair.code === errorCode) {
      return pair.message;
    }
  }

  return errors.UNIDENTIFIED_ERROR.message;
};

const formatError = (action, error, exception, data) => {
  const errorCode = error.code || error.errorCode;
  const errorMessage = error.message || error.errorMessage;
  return `START>>>>>  ERROR: ${action} >>>>> ERROR CODE: ${errorCode} >>>>> ERROR MESSAGE: ${errorMessage} >>>>> ${`DATA: ${JSON.stringify(data)}`} 
    >>>>> ${`EXCEPTION: ${JSON.stringify(exception)}`} >>>>>END`;
};

const logError = (action, error, exception, data = 'NO DATA') => {
  const formattedError = formatError(action, error, exception, data);
  // eslint-disable-next-line
  console.debug(formattedError);
};

const joiError = (error) => {
  const errorCode = error.name;
  const errorMessage = error.details[0].message;
  return { errorCode, errorMessage };
};
const throwException = (action, error, exception, data = 'NO DATA') => {
  const formattedError = formatError(action, error.isJoi ? joiError(error) : error, exception, data);
  // eslint-disable-next-line
  console.debug(formattedError);
  throw new Exception(formattedError, error.isJoi ? joiError(error) : error);
};

export default {
  extractErrorMessage,
  logError,
  throwException,
};
