var User = require('../models/user');
const bcrypt = require('bcrypt');

var HomeController = {
  Index: function(req, res) {
    // res.setHeader({})
    res.render('home/index', { title: 'IceBook'});
  },
  Signup: function(req, res) {
    res.render('home/signup', { title: 'IceBook' });
  },
  Login: function(req, res) {
    console.log(req.flash('failMessage'))
    res.render('home/login', { title: 'IceBook', message: req.flash('failMessage') });
  },
  Logout: function(req, res) {
    req.session.destroy
    res.render('home/login', {title: 'IceBook' });
  },
  LoginUser: function(req,res) {
    User.findOne({ username: req.body.
      username}).exec().then(data => {
      if(!data) {
          req.flash('failMessage', 'Your username or password is incorrect');
          return res.status(400).redirect('/login');
      }
      if(!bcrypt.compareSync(req.body.password, data.password)) {
        req.flash('failMessage', 'Your username or password is incorrect');
        return res.status(400).redirect('/login');
      }
      req.session.test = 'tomato';
      req.session.username = req.body.username;

      req.session.title = data.title;
      req.session.firstname = data.firstname;
      req.session.lastname = data.lastname;
      req.session.password = req.body.password;
      req.session.Gender = data.Gender;
      req.session.Birthday = data.Birthday;
      req.session.About = data.About;

      res.status(201).redirect('/profile');
     });
  },
  CreateUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.session.password = req.body.password;
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.Status = true;
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }
      req.session.test = 'tomato';
      req.session.username = req.body.username;

      req.session.title = req.body.title;
      req.session.firstname = req.body.firstname;
      req.session.lastname = req.body.lastname;

      req.session.Gender = req.body.Gender;
      req.session.Birthday = req.body.Birthday;
      req.session.About = req.body.About;

      res.status(201).redirect('/posts');
    });
  },
};

module.exports = HomeController;
