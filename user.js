var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  email:String,
  password:String,
  area:String,
  following:Array
});
// var orgSchema = new Schema({
//   name: String,
//   area:String,
//   password:String,
//   area:String,
//   follwers:Array
// });

// the schema is useless so far
// we need to create a model using it
var folks = mongoose.model('folk', userSchema);
//var orgs=mongoose.model('org',orgSchema);
//connect with database
mongoose.connect('mongodb://localhost:2024/smartFolks');
// make this available to our users in our Node applications
module.exports = folks;
//module.exports=orgs;