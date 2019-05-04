require('module-alias/register');

module.exports = (app) => {
  /**
   * No access page
   */
  app.get(['/no-access/', '/no-access'], async (req, res) => {
    res.sendFile('server/app/views/no-access.html', { root: app.get('root') });
  });
};
