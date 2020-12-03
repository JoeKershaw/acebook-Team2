var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('has a message', function(){
    var profile = new User({title: 'Mr', username: 'test@test.com', firstname: 'test',
  lastname: 'test', password: 'password', Gender: 'Male', Birthday: '12-02-2020', About: 'none'})
    expect(profile.title).toEqual('Mr')
    expect(profile.username).toEqual('test@test.com')
    expect(profile.firstname).toEqual('test')
    expect(profile.lastname).toEqual('test')
    expect(profile.password).toEqual('password')
    expect(profile.Gender).toEqual('Male')
    expect(profile.Birthday).toEqual('12-02-2020')
    expect(profile.About).toEqual('none')
  });
});


// describe('log in', function(){
//   beforeEach(function(done) {
//       mongoose.connection.collections.users.drop(function() {
//           done();
//       });
//   });
//
//   it('')
//
// });
