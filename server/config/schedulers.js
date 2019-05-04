const schedule = require('node-schedule'),
  mailerService = require('@services/mailer'),
  { needSendMails } = require('@config');

module.exports = () => {
  schedule.scheduleJob('*/10 * * * * *', () => {
    // call mailer
    if (needSendMails) { mailerService.run(); }
  });
};
