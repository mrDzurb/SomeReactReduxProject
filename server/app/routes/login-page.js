require('module-alias/register');

module.exports = (app) => {
  /**
   * Loin page
   */
  app.get(['/login/', '/login'], async (req, res) => {
    res.sendFile('server/app/views/login.html', { root: app.get('root') });
  });
};
