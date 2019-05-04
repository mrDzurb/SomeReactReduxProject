const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  updated: Date,
  weekends: [String]
});

mongoose.model('Weekends', Schema);
