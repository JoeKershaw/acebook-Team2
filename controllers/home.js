var User = require('../models/user');
const bcrypt = require('bcrypt');
var fs = require('fs');

var HomeController = {
  Index: function(req, res) {
    // res.setHeader({})
    res.render('home/index', { title: 'IceBook'});
  },
  Signup: function(req, res) {
    res.render('home/signup', { title: 'IceBook' });
  },
  Login: function(req, res) {
    res.render('home/login', { title: 'IceBook' });
  },
  Logout: function(req, res) {
    req.session.destroy
    res.render('home/login', {title: 'IceBook' });
  },
  LoginUser: function(req,res) {
    User.findOne({ username: req.body.
      username}).exec().then(data => {
      if(!data) {
          return res.status(400).send({ message: "Your username or password is incorrect" });
      }
      if(!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(400).send({ message: "Your username or password is incorrect" });
      }
      req.session.test = 'tomato';
      req.session.username = req.body.username;
      req.session.name = data.name;
      //req.session.title = data.title;
      //req.session.firstname = data.firstname;
      //req.session.lastname = data.lastname;

      res.status(201).redirect('/profile');
     });
  },
  CreateUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.Status = true;
    var user = new User(req.body);
    var imgPath = './public/images/mario.png'
    user.image.data = fs.readFileSync(imgPath, "base64");
    user.image.contentType = 'image/png';
    const buffer = Buffer.from(user.image.data, "base64");
    var string = buffer.toString("base64");
    console.log(user.image.data);
    console.log(buffer);
    fs.writeFileSync("new-path.png", buffer);
    user.save(function(err) {
      if (err) { throw err; }
      req.session.test = 'tomato';
      req.session.username = req.body.username;
      req.session.title = req.body.title;
      req.session.firstname = req.body.firstname;
      req.session.lastname = req.body.lastname;
      req.session.image = req.body.image;

      res.status(201).redirect('/posts');
    });
  },
};

module.exports = HomeController;
