require('module-alias/register');
const userApi = require('@apis/user'),
  staffApi = require('@apis/staff'),
  { NoAccessError } = require('@services/custom-errors');

module.exports = (app) => {
  /**
   * load base page template
   */
  app.get(['/absence-page/', '/absence-page'], async (req, res, next) => {
    try {
      // get current user
      const userInfo = await userApi.getCurrentUser(req, res);
      if (userApi.hasAccess(userInfo, 'absence-page', 'read')) {
        res.sendFile('server/public/absence-page/index.html', { root: app.get('root') });
      } else {
        throw new NoAccessError('No data access');
      }
    } catch (error) {
      next(error);
    }
  });

  /**
   * Add new record
   */
  app.post('/absence-page/save', async (req, res, next) => {
    try {
      // get current user
      const userInfo = await userApi.getCurrentUser(req);
      if (userApi.hasAccess(userInfo, 'absence-page', 'write')) {
        // save data to db
        const result = await staffApi.addAbsence(userInfo, req.body);
        // prepare and return result
        res.json({ status: 'ok', data: result });
      } else {
        throw new NoAccessError('No data access');
      }
    } catch (error) {
      next(error);
    }
  });

  return this;
};
