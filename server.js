// require express framework and additional modules
var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyParser = require('body-parser');
  // requiring mongoose & the user model
  mongoose = require('mongoose'),
  User = require('./models/user');

// connect to mongodb 
// connecting to the database
mongoose.connect('mongodb://localhost/test');

// set view engine for server-side templating
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended: true}));

// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.send('coming soon');
});

//add a POST /users route to accept user sign up requests
// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.send(user);
  });
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    res.send(user);
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});