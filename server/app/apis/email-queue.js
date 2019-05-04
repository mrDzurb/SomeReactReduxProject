const mongoose = require('mongoose');
// const moment = require('moment');
require('module-alias/register');
const { EmailQueueModel } = require('@server/app/setup');

/**
 * @desc Add new queue
 *
 * @namespace apis.eamil-queue
 * @method add
 * @param {String} subject - message subject
 * @param {String} body - message body
 * @param {Array} recipients - list of recipients [{email: '', fio: ''}]
 * @param {Boolean} sendAsHtml - true if message format is HTML
 * @param {object} userInfo - if message from specific user
 * @return {Object} added record
 */
module.exports.add = async (subject, body, recipients, sendAsHtml = false, userInfo = null) => {
  const newRow = new EmailQueueModel({
    subject,
    body,
    recipients,
    send_as_html: sendAsHtml,
    user_email: userInfo ? userInfo.email : null,
    user_fio: userInfo ? userInfo.fio : null
    // date_added: moment.utc(),
  });
  // add record to db
  await newRow.save();
  return newRow;
};

/**
 * @desc Get list of data
 *
 * @namespace apis.eamil-queue
 * @method getList
 *
 * @param {Object} filter - filter for data searching
 * @param {Object} fields - list of result fields
 * @return {Arrray} return list of data
 */
module.exports.getList = async (filter = null, fields = null) => {
  const result = await EmailQueueModel.find(filter)
    .sort({ date_added: 1 })
    .select(fields);
  return result;
};

/**
 * @desc Update one record by id
 *
 * @namespace apis.email
 * @method update
 * @param {String} id - record id
 * @param {Object} params - fields to update { fieldName1: value, fieldName2: value }
 * @return {Object} updatetd recod
 */
module.exports.update = async (id, params) => {
  const row = await EmailQueueModel.update(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: params }
  );
  return row;
};

/**
 * @desc Update many records by query params
 *
 * @namespace apis.email
 * @method batchUpdate
 *
 * @param {Object} filter - filter for data searching
 * @param {Object} params - fields to update { fieldName1: value, fieldName2: value }
 * @return {Object} updatetd recod
 */
module.exports.batchUpdate = async (filter, params, extraParams = {}) => {
  try {
    const query = { $set: params, ...extraParams };
    await EmailQueueModel.update(filter, query, { multi: true });
  } catch (error) {
    console.error(`Error: ${ error }\n${ error.stack }`);
  }
};

