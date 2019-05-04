require('module-alias/register');

const http = require('http'),
  { port } = require('@config'),
  app = require('@app');

// setup server
http.Server(app);

// start server
const server = app.listen(
  port || 5000,
  () => console.log(`Start V2.0 server on ${ server.address().port }`)
);
