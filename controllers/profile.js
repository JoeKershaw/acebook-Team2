var User = require('../models/user');
var Post = require('../models/post');
const bcrypt = require('bcrypt');

var ProfileController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    User.findOne({ username: req.session.username}).exec().then(data => {
      Post.find({owner: data.username}, null, {sort: {date: -1}}, function(err, posts) {
        if (err) { throw err; }
        console.log(data)
      res.render('profile/profile', { user: data, title: "IceBook", posts: posts });
    });
    })
  },
  Editor: function(req, res){
      res.render('profile/edit', {title: 'IceBook' });
  },
  EditUser: function(req, res) {
    req.body.firstname = req.body.firstname === "" ? req.session.firstname : req.body.firstname
    req.body.secondname = req.body.secondname === "" ? req.session.secondname : req.body.secondname
    req.body.password = req.body.password === "" ? req.session.password : req.body.password
    req.session.password = req.body.password;
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    if (req.body.Gender === "") {
      req.body.Gender = req.session.Gender
    }
    else {
      req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    };
    req.body.Birthday = req.body.Birthday === "" ? req.session.Birthday : req.body.Birthday;
    req.body.About = req.body.About === "" ? req.session.About : req.body.About;

    User.updateOne({ username: req.session.username}, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      Gender: req.body.Gender,
      Birthday: req.body.Birthday,
      About: req.body.About,
    }, function(err, affected, res) {
      console.log(res);
    })

    Post.updateMany({ owner: req.session.username}, { 
      ownername: req.body.firstname, 
    }, function(err, affected, resp) { 
      console.log(resp);
     })

      req.session.firstname = req.body.firstname;
      req.session.secondname = req.body.secondname;
      req.session.Gender = req.body.Gender;
      req.session.Birthday = req.body.Birthday;
      req.session.About = req.body.About;
      res.status(201).redirect('/profile');

  },
  Delete: function(req, res) {


      Post.deleteOne({_id: req.body.delpost}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.status(201).redirect('/profile');
        }
      });
  //}));
  },
  Create: function(req, res) {

    req.body.likes = 0;
    req.body.owner = req.session.username;
    req.body.date = new Date();

      var post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/profile');
      });
    }
}
    module.exports = ProfileController;
