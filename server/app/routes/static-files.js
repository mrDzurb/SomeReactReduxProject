const express = require('express');

module.exports = (app) => {
  app.use('/server/public', express.static(`${ app.get('root') }/server/public`));
  app.use(express.static(`${ app.get('root') }/server/public`));

  return this;
};
