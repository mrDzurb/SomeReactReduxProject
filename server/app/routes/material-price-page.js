require('module-alias/register');
const userApi = require('@apis/user'),
  serviceApi = require('@apis/service'),
  { NoAccessError } = require('@services/custom-errors');

module.exports = (app) => {
  /**
   * load base page template
   */
  app.get(['/material-price-page/', '/material-price-page'], async (req, res, next) => {
    try {
      // get current user
      const userInfo = await userApi.getCurrentUser(req, res);
      if (userApi.hasAccess(userInfo, 'material_price_page', 'read')) {
        res.sendFile('server/public/material-price-page/index.html', { root: app.get('root') });
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
  app.post('/material-price-page/get', async (req, res, next) => {
    try {
      // get current user
      const userInfo = await userApi.getCurrentUser(req);
      if (userApi.hasAccess(userInfo, 'material_price_page', 'read')) {
        res.json({
          status: 'ok',
          data: await serviceApi.getMaterialPriceInfo(req.body.search_order_number, req.body.search_material_key)
        });
      } else {
        throw new NoAccessError('No data access');
      }
    } catch (error) {
      next(error);
    }
  });

  return this;
};
