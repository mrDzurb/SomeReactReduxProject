const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  code : Number,
  contract_id : mongoose.Schema.Types.ObjectId,
  sector_id: mongoose.Schema.Types.ObjectId,
  sector_code: Number,
  sector_name: String,
  change_history: [],
  date_change: Date,
  materials: [],
  product_number: Number,
  production_i: mongoose.Schema.Types.ObjectId,
  remarks: { contains_remark: Boolean },
  user_email: String,
  order_number: String,
  contract_number: Number,
  group_remarks : {},
  document_type : String,
  note: String,
  documents: {}
}, { collection: 'm_calculation' });

mongoose.model('Сalculation', Schema);

