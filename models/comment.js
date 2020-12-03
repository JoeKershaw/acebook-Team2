var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  message: String,
  owner: String,
  date: Date,
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
