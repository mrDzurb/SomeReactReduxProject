const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  comment : String,
  subject: String,
  body: String,
  recipients: [{ fio: String, email: String }],
  send_as_html: String,
  user_email: String,
  user_fio: String,
  date_added: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'new' // [new, process, complete, error]
  },
  status_msg: {
    type: String,
    default: ''
  },
  send_attempt: {
    type: Number,
    default: 0  // count of attempts
  },
  last_attempt_date: {
    type: Date,
    default: null
  }
}, { collection: 'emailqueue' });

mongoose.model('EmailQueue', Schema);
