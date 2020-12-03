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
  //UploadPic: function(req, res) {

  //},
  CreateUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.Status = true;
    var imgPath = './public/images/mario.png';
    var user = new User(req.body);
    //var avatar
    user.image.data = fs.readFileSync(imgPath);
    user.image.contentType = 'image/png';
    var buffer = new Buffer(user.image.data).toString('base64');;
    //res.render('home/index', {image: buffer});
    //console.log(buffer);
    //console.log(string);
    user.save(function(err) {
      if (err) { throw err; }
      req.session.test = 'tomato';
      req.session.username = req.body.username;
      req.session.title = req.body.title;
      req.session.firstname = req.body.firstname;
      req.session.lastname = req.body.lastname;
      req.session.image = req.body.image;

      //var dserver = express.createServer();
      //dserver.get('/profile', function (err, doc) {
        //User.findById(user, function (err, doc) {
          //if(err) return next(err);
          //res.contentType(doc.image.contentType);
          //res.send(doc.img.date);
        //});
      //});

      //function base64_encode(file) {
        //var photo = fs.readFileSync(dp);
        //return new Buffer(photo).toString('base64');

      //}
      //var base64str = base64_encode('mario.png')

      res.status(201).redirect('/posts');
    });
  },
};

module.exports = HomeController;
