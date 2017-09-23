var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var orgSchema = new Schema({
  name: String,
  area:String,
  password:String,
  email:String
});

// the schema is useless so far
// we need to create a model using it
var org=mongoose.model('org',orgSchema);
//connect with database
mongoose.connect('mongodb://localhost:2024/smartFolks');
// make this available to our users in our Node applications
module.exports=org;