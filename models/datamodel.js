var mongoose = require('mongoose')

var personSchema = mongoose.Schema({
  _id       : Number,
  name      : String,
  picture   : String,
  about     : String,
  position  : String,
  education : String,
  website   : String,
  papers    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper'}]
});

var paperSchema = mongoose.Schema({
  _id       : Number,
  title     : String,
  status    : String,
  abstract  : String,
  authors   : [String],
  members   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
  link      : String
});

var Person = mongoose.model('Person', personSchema);

var Paper = mongoose.model('Paper', paperSchema);

module.exports = {Person, Paper}
