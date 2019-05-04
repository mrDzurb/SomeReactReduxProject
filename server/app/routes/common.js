require('module-alias/register');

const commonApi = require('@apis/common'),
  userApi = require('@apis/user'),
  mailerService = require('@services/mailer');

module.exports = (app) => {
  /**
   * @desc Get common information for all pages
   *  - Info about current user
   *  - Info about menu structure
   *  - Info about all users in system
   *  - Info about weekends
  */
  app.get(['/routine/get_common_info/:page_key'], async (req, res) => {
    try {
      // get current user info
      const resultInfo = await commonApi.getCommonInfo(req.params.page_key);
      resultInfo.user = await userApi.getCurrentUser(req);
      res.json({ status: 'ok', data: resultInfo });
    } catch (err) {
      res.json({ status: 'error', msg: err.toString() });
    }
  });

  /**
   * @desc Send all email messages from queue
  */
  app.get(['/routine/send_all_email_messages'], async (req, res) => {
    try {
      await mailerService.run();
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', msg: err.toString() });
    }
  });
};
