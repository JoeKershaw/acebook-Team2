var Post = require('../models/post');


var PostsController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    Post.find({}, null, {sort: {date: -1}},function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, test: req.session.test,  title: 'IceBook' });
    });
  },
  Like: function(req, res) {
    Post.findOne({_id: req.body.likepost}).exec().then(data => {
      Post.updateOne({_id: req.body.likepost}, {
        likes: data.likes += 1,
      }, function(err, affected, res){
        console.log(res);
      })
    })

    res.status(201).redirect('/posts')
  },
  Create: function(req, res) {

    req.body.likes = 0;
    req.body.owner = req.session.name;
    req.body.date = new Date();

      var post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/posts');
      });
    }
  };

module.exports = PostsController;
