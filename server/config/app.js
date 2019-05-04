require('module-alias/register');
const path = require('path'),
  express = require('express'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  consign = require('consign'),
  cors = require('cors'),
  config = require('./index.js');

// initialize database
require('./database')(mongoose, config);
// initialize schedulers
require('./schedulers')();

const app = express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(cors())
  .use(cookieParser());

// set global project root dirrectory
app.set('root', path.join(__dirname, '../..'));

// include all modules
consign({ cwd: 'server/app' })
  .include('setup')
  .then('routes')
  .into(app);

module.exports = app;
