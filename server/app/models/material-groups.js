const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  note: String,
  name: String,
  materials: [],
  type : String,
  code : Number,
  is_active : Number,
  routine : Number
}, { collection: 'm_materialsgroup' });

mongoose.model('MaterialsGroup', Schema);

