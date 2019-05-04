require('module-alias/register');
const cryptoApi = require('@services/crypto-helper');
const { UnAuthorizedRequestError } = require('@services/custom-errors');
const { cookieSign, cookieKey } = require('@config');
const { UsersModel } = require('@server/app/setup');

/**
 * Get common information about user and his accesses for pages
 *
 * @namespace apis.common
 * @method getCommonInfo
 * @param {String} page - key of current page
 * @return {Object} result information about all pages to which user has accessdf
 */
module.exports.getAll = async () => {
  const result = await UsersModel.find()
    .sort({ fio: 1, email: 1 })
    .select({
      _id:1, fio:1, email:1, admin:1, table:1, stat:1, roles:1, inner_phone:1, pages:1
    });
  return result;
};


/**
 * @desc Get current signed user. Extend some properties for result object.
 * @param Object req - Server request
 * @return Json user information
 */
module.exports.getCurrentUser = async (req) => {
  try {
    if (!req.cookies[cookieKey]) { throw new UnAuthorizedRequestError('No authentication data provided'); }
    const userSessionInfo = JSON.parse(cryptoApi.decode(req.cookies[cookieKey], cookieSign));
    if (!userSessionInfo || !userSessionInfo.email) { return null; }
    const userInfo = await UsersModel.findOne({ email: userSessionInfo.email });
    if (!userInfo) { throw new Error(`User ${ userSessionInfo.email } not found`); }
    // add field - type in userInfo
    userInfo.type = userSessionInfo.type ? userSessionInfo.type : '';
    userInfo.password = null;
    userInfo.credentials = null;
    // merge pages accesses from different roles to one object
    userInfo.pages = {};
    if (userInfo.roles) {
      for (const role of userInfo.roles) {
        for (const pageKey in role.pages) {
          if (!(pageKey in userInfo.pages)) {
            userInfo.pages[pageKey] = role.pages[pageKey];
          } else {
            for (const a of role.pages[pageKey]) {
              if (a !== 'additional' || role.pages[pageKey].o) {
                userInfo.pages[pageKey] = role.pages[pageKey][a];
              }
            }
          }
        }
      }
    }
    return userInfo;
  } catch (e) {
    throw e;
  }
};

/**
 * @desc Get accesses for user
 * @param Object userInfo user information
 * @param String page page key to check
 * @return Json {'role':'', 'access': ''}
 */
module.exports.getPageAccess = (userInfo, page) => ({
  role: userInfo.admin,
  access: userInfo.pages[page]
});

/**
 * @desc Check user access to the page
 * @param Object userInfo user information
 * @param String page page key to check
 * @param String access key of access
 * @return Bool
 */
module.exports.hasAccess = (userInfo, page, access) => (
  userInfo.admin === 'admin' || (userInfo.pages && access in userInfo.pages[page])
);
