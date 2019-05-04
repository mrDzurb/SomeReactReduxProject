require('module-alias/register');
const moment = require('moment'),
  mailerService = require('@services/mailer'),
  routineService = require('@services/routine'),
  { AbsenceModel } = require('@server/app/setup'),
  { factoriesMails } = require('@config');

/**
 * @desc Prepare and send email message
 *
 * @namespace apis.staff
 * @method prepareAndSendEmailNotification
 * @param {Object} userInfo - info about current user
 * @param {Object} params - params to send
 */
const prepareAndSendEmailNotification = async (userInfo, params) => {
  try {
    let htmlBody = '';
    const recipients = [];
    // get reason description
    const reason =  [
      { key: 'personal', name: 'по личным делам' },
      { key: 'work', name: 'по рабочим делам' },
      { key: 'holiday', name: 'отпуск' },
      { key: 'business_trip', name: 'командировка' }
    ].find(x => x.key === params.reason);

    if (params.notify_moscow) {
      recipients.push({
        email:factoriesMails.moscow.email, fio: factoriesMails.moscow.name
      });
    }
    if (params.notify_kaluga) {
      recipients.push({
        email:factoriesMails.kaluga.email, fio: factoriesMails.kaluga.name
      });
    }
    if (params.notify_penza) {
      recipients.push({
        email:factoriesMails.penza.email, fio: factoriesMails.penza.name
      });
    }

    // recipients = [{ email:'ldprsl@inbox.ru', fio: 'Cherkasov' }];

    htmlBody = `<strong>Причина: </strong>${ reason.name }<br/><br/>`;
    const dateFrom = (params.is_full_day) ? moment.utc(params.date_from, 'DD.MM.YYYY h:mm').format('DD.MM.YYYY') : moment.utc(params.date_from, 'DD.MM.YYYY h:mm').format('DD.MM.YYYY h:mm');
    const dateTo = (params.is_full_day) ? moment.utc(params.date_to, 'DD.MM.YYYY h:mm').format('DD.MM.YYYY') : moment.utc(params.date_to, 'DD.MM.YYYY h:mm').format('DD.MM.YYYY h:mm');
    htmlBody += `<strong>Дата</strong> с ${ dateFrom } по ${ dateTo }<br/><br/>`;
    htmlBody += `<strong>Примечание: </strong>${ routineService.rNToBr(params.comment) }`;

    // send email
    await mailerService.send('Отсутствие', htmlBody, recipients, true, userInfo);
  } catch (error) {
    console.error(`Error: ${ error }\n${ error.stack }`);
  }
};

/**
 * Add new Absence
 *
 * @namespace apis.staff
 * @method addAbsence
 * @param {Object} userInfo - info about current user
 * @param {Object} params - params to add
 * @return {Object} added record
 */
module.exports.addAbsence = async (userInfo, params) => {
  const newRow = new AbsenceModel({
    user: userInfo.email || '',
    date: moment.utc(),
    reason: params.reason,
    is_full_day: params.is_full_day,
    date_from: moment.utc(params.date_from, 'DD.MM.YYYY h:mm'),
    date_to: moment.utc(params.date_to, 'DD.MM.YYYY h:mm'),
    notify_moscow: params.notify_moscow,
    notify_kaluga: params.notify_kaluga,
    notify_penza: params.notify_penza,
    comment: params.comment
  });
  // add record to db
  await newRow.save();
  // send email notification
  prepareAndSendEmailNotification(userInfo, params);

  return newRow;
};

