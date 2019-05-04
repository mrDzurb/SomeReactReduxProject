require('module-alias/register');
const { UnAuthorizedRequestError, NoAccessError } = require('@services/custom-errors');
const { intV1Url, noAccessPage } = require('@config');

module.exports.GlobalErrorHandler = (err, req, res, next) => {
  console.log('global error handler');
  console.log(err);
  if (req.xhr || req.headers.accept.indexOf('json') > -1) { // ajax request
    if (err instanceof UnAuthorizedRequestError) {
      res.status(401).json({ msg: 'No authentication data provided' });
    } else if (err instanceof NoAccessError) {
      res.status(401).json({ msg: 'No data access' });
    } else { res.status(200).json({ status: 'error', msg: err.message }); }
  } else if (err instanceof UnAuthorizedRequestError) {
    res.redirect(`${ intV1Url }/login`);
  } else if (err instanceof NoAccessError) {
    res.redirect(noAccessPage);
  } else {
    res.redirect(noAccessPage);
  }
};
