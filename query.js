var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var querySchema = new Schema({
  name: String,
  email:String,
  message:String,
  time:String,
  reply:String
});

// the schema is useless so far
// we need to create a model using it
var query=mongoose.model('querie',querySchema);
//connect with database
mongoose.connect('mongodb://localhost:2024/smartFolks');
// make this available to our users in our Node applications
module.exports=query;