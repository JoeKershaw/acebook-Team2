var Post = require('../models/post');
var Comment = require('../models/comment');


var PostsController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    Post.find({}, null, {sort: {date: -1}}).populate('comments').exec(function(err, posts) {
      if (err) { throw err; }
      res.render('posts/index', { posts: posts, test: req.session.test,  title: 'IceBook' });
  });
},
  Comment: function(req,res) {
    Post.findOne({_id: req.body.post_id}).exec().then(data => {
        var comment = new Comment({message: req.body.comment, owner: req.session.firstname, date: new Date()})
        comment.save(function(err) {
          if (err) { throw err; }
        });
        data.comments.push(comment);
        data.save(function(err) {
          if (err) { throw err; };
          res.status(201).redirect('/posts')
        });
      });
    },
  Like: function(req, res) {
    Post.findOne({_id: req.body.post_id}).exec().then(data => {
      let p = new Promise((resolve, reject) => {
        resolve(Post.updateOne({_id: req.body.post_id}, {$addToSet: {liked_by: [req.session.firstname]}}, {
        }, function(err, affected, res){
          console.log(res);
        }))
        reject('Failed');
      });
      let q = new Promise((resolve, reject) => {
        resolve(Post.updateOne({_id: req.body.post_id}, {
          likes: data.likes += 1,
        }, function(err, affected, res){
          console.log(res);
        }))
        reject('Failed');
      });
      Promise.all([
        p,
        q
      ]).then((message)=> {res.status(201).redirect('/posts')
    }).catch((message) => {
      console.log(message)
    })
  })
},
Create: function(req, res) {
  req.body.likes = 0;
  req.body.owner = req.session.username;
  req.body.ownername = req.session.firstname;
  req.body.date = new Date();
  var post = new Post(req.body);
  post.save(function(err) {
    if (err) { throw err; }
    res.status(201).redirect('/posts');
  });
}
};

module.exports = PostsController;
