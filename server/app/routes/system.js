require('module-alias/register');
const { GlobalErrorHandler } = require('@middlewares/global-error-handler');
const { intV1Url } = require('@config');

module.exports = app => {
  // 404 page handler
  app.get('*', (req, res) => {
    // res.status(404).send('Page not found');
    // redirect all undefined queries to INTV1
    res.redirect(`${ intV1Url }${ req.path }`);
  });

  // global error handler
  // if (app.get('env') === 'development') {
  app.use(GlobalErrorHandler);
};
