require('module-alias/register');
const nodemailer = require('nodemailer'),
  emailQueueApi = require('@apis/email-queue'),
  moment = require('moment'),
  { mailSettings } = require('@config');

/**
 * @desc Prepare and send messages
 * @namespace services.mailer
 * @method prepareAndSendMessages
 *
 * @param {Array} items - list of EmailQueue model objects
 */
const prepareAndSendMessages = async (items) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transportSettings = {
      host: mailSettings.host,
      port: mailSettings.port,
      secure: mailSettings.secure,
      auth: {
        user: mailSettings.user,
        pass: mailSettings.password
      }
    };
    if (mailSettings.tls) {
      transportSettings.tls = { rejectUnauthorized: false };
    }

    // create transporter wit settings
    const transporter = await nodemailer.createTransport(transportSettings);
    const isTransporterOk = await transporter.verify();

    if (isTransporterOk) {
      // prepare and send every message
      for (const item of items) {
        let emailFrom = '';
        let fioFrom = '';
        if (item.user_email) {
          emailFrom = item.user_email;
          fioFrom = item.user_fio;
        } else {
          emailFrom = mailSettings.from;
          fioFrom = mailSettings.fio;
        }

        // setup email data with unicode symbols
        const mailOptions = {
          from: `"${ fioFrom }" <${ emailFrom }>`, // sender address
          to: item.recipients.map(a => a.email).join(','),
          replyTo: emailFrom,
          'Disposition-Notification-To': 'k@modul.org',
          subject: item.subject,
          text: (!item.send_as_html) ? item.body : '',
          html: (item.send_as_html) ? item.body : ''
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (sErr, info) => {
          if (sErr) {
            // update information in DB
            emailQueueApi.batchUpdate(
              { _id: item._id },
              { status: 'error', status_msg: sErr.toString(), last_attempt_date: moment.utc() }
            );
            console.error(`Error: ${ sErr }`);
          } else {
            // update information in DB
            emailQueueApi.batchUpdate(
              { _id: item._id },
              { status: 'complete', status_msg: info.messageId, last_attempt_date: moment.utc() }
            );
            console.error(`Message has been sent: ${ info.messageId }`);
          }
        });
      }
    }
    // close connection
    transporter.close();
  } catch (error) {
    throw error;
  }
};

/**
 * @desc Send all email messages from queue
 * @namespace services.mailer
 * @method run
 */
const run = async () => {
  try {
    // get all records with statuses 'new' and 'error'
    const items = await emailQueueApi.getList({ status: { $in: ['new', 'error'] } });
    try {
      // console.log(`${ items.length.toString() } email message(s) in queue.`);
      // update statuses to  - 'process'
      await emailQueueApi.batchUpdate(
        { _id: { $in: items.map(a => a._id) } },
        { status: 'process', last_attempt_date: moment.utc() },
        { $inc:{ send_attempt : 1 } }
      );
      // send messages
      await prepareAndSendMessages(items);
    } catch (err) {
      await emailQueueApi.batchUpdate(
        { _id: { $in: items.map(a => a._id) } },
        { status: 'error', last_attempt_date: moment.utc() }
      );
      throw err;
    }
  } catch (error) {
    console.error(`Error: ${ error }\n${ error.stack }`);
  }
};

/*
 * @desc Email sender
 * @namespace services.mailer
 * @method send
 * @param {String} subject - message subject
 * @param {String} body - message body
 * @param {Array} recipients - list of recipients [{email: '', fio: ''}]
 * @param {Boolean} sendAsHtml - true if message format is HTML
 * @param {String} userEmail - if message from specific user
 */
const send = async (subject, body, recipients, sendAsHtml = false, userInfo) => {
  if (recipients && recipients.length > 0) {
    await emailQueueApi.add(subject, body, recipients, sendAsHtml, userInfo);
    run();
  }
};

// export modules
module.exports.run = run;
module.exports.send = send;
