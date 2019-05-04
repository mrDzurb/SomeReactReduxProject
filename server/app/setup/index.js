require('module-alias/register');

const mongoose = require('mongoose');
require('@models/users');
require('@models/weekends');
require('@models/absences');
require('@models/email-queue');
require('@models/material-groups');
require('@models/calculations');

module.exports.UsersModel = mongoose.model('Users');
module.exports.WeekendsModel = mongoose.model('Weekends');
module.exports.AbsenceModel = mongoose.model('Absences');
module.exports.EmailQueueModel = mongoose.model('EmailQueue');
module.exports.MaterialGroupsModel = mongoose.model('MaterialsGroup');
module.exports.CalculationsModel = mongoose.model('Сalculation');
