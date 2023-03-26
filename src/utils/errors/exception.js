class Exception extends Error {
  constructor(formattedError, error, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, Exception);

    // Custom debugging information
    this.exception = formattedError;
    this.errorCode = error.code || error.errorCode;
    this.errorMessage = error.message || error.errorMessage;
    this.date = new Date();
  }
}

export default Exception;
