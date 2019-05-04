const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  email: String,
  fio: String,
  table: String,
  stat: String,
  inner_phone: String,
  roles: [{}],
  password: String,
  notice: [{ key: String, type: String }],
  default_page: String,
  credentials: String,
  admin: String,
  pages_settings: {}
});

mongoose.model('Users', Schema);
