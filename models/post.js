var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  owner: String,
  ownername: String,
  date: Date,
  likes: Number,
  liked_by: Array,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  image: Buffer,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
