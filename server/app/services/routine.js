const moment = require('moment');

/*
 * @desc Deep copy object
 * @param object
 * @return cloned object
 */
module.exports.deepCopy = object => JSON.parse(JSON.stringify(object));

/**
 * @desc get Moment Date object  from string
 * @param string
 * @return Moment Date object
 */
module.exports.strToMomentDate = (val, format = 'DD.MM.YYYY HH:mm') => moment(val, format);

/**
 * @desc check string on date
 * @param string
 * @return true/false
 */
module.exports.isStrValidDate = (val, format = 'DD.MM.YYYY HH:mm') => moment(val, format).isValid();

/**
 * @desc Replce in string all \rn to br
 * @param string
 * @return true/false
 */
module.exports.rNToBr = val => val.replace(/\n/g, '<br />').replace(/\r\n/g, '<br />');
