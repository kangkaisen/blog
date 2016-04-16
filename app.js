var config = require('./config');
var routes = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');

var app = express();
var server = require('http').Server(app);

app.use(session({
  secret: 'kangkaisen',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 * 24}}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), {'index': ['page/1.html'], 'maxAge': '3600000'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('method-override')());
app.use(errorhandler());
app.use('/', routes);

server.listen(config.port, function () {
  console.log("blog listening on port %d in %s mode", config.port, app.settings.env);
});

module.exports = app;
