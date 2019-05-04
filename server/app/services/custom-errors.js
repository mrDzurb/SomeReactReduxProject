/**
 * @desc Custom error for unathorized request
 */
class UnAuthorizedRequestError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, UnAuthorizedRequestError);
  }
}

/**
 * @desc Custom error for user no access
 */
class NoAccessError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NoAccessError);
  }
}

module.exports.NoAccessError = NoAccessError;
module.exports.UnAuthorizedRequestError = UnAuthorizedRequestError;

