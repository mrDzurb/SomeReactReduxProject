require('module-alias/register');
const { WeekendsModel } = require('@server/app/setup');

const pageApi = require('@apis/page'),
  userApi = require('@apis/user');

/**
 * Get information about weekends
 *
 * @namespace apis.common
 * @method getWeekends
 * @return {Array} result list of dates in string format
 */
const getWeekends = async () => {
  const result = await WeekendsModel.findOne();
  return result.weekends;
};

/**
 * Get common information about user and his accesses for pages
 *
 * @namespace apis.common
 * @method getCommonInfo
 * @param {String} page - key of current page
 * @return {Object} result information about all pages to which user has accessdf
 */
module.exports.getCommonInfo = async (page) => ({
  menu: pageApi.getGrouppedPages(),
  users: await userApi.getAll(),
  currentPage: pageApi.getPage(page),
  weekends: await getWeekends()
});
