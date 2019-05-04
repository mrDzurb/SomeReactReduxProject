const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  comment : String,
  notify_penza : Boolean,
  reason : String,
  user : String,
  date_to : Date,
  date : Date,
  notify_moscow : Boolean,
  is_full_day : String, // ['yes', 'no']
  notify_kaluga : Boolean,
  date_from : Date
});

mongoose.model('Absences', Schema);

