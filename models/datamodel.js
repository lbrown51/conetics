var mongoose = require('mongoose')

var personSchema = mongoose.Schema({
  name      : String,
  picture   : String,
  about     : String,
  position  : String,
  education : String,
  website   : String,
  email     : String,
  papers    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper'}]
});
// Allow for input of picture

var paperSchema = mongoose.Schema({
  title     : String,
  status    : String,
  authors   : String,
  journal   : String,
  members   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
  link      : String
});

var Person = mongoose.model('Person', personSchema);

var Paper = mongoose.model('Paper', paperSchema);

module.exports = {Person, Paper}
