var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  title: String,
  firstname: String,
  lastname: String,
  password: String,
  Gender: String,
  Birthday: String,
  About: String,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
