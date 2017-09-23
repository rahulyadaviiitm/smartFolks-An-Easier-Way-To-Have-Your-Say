var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var eventSchema = new Schema({
  author: String,
  org_id:String,
  area:String,
  topic:String,
  description:String,
  img:String,
  time:String,
  like_by:Array,
  dislike_by:Array
});

// the schema is useless so far
// we need to create a model using it
var eventOrg = mongoose.model('event', eventSchema);
//var orgs=mongoose.model('org',orgSchema);
//connect with database
mongoose.connect('mongodb://localhost:2024/smartFolks');
// make this available to our users in our Node applications
module.exports = eventOrg;
//module.exports=orgs;