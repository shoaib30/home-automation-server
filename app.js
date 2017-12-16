var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mqtt = require('mqtt')


var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var client = mqtt.connect('mqtt://localhost', {
  "username": "iotUser",
  "password": "H@ck3r1O1"
})

var index = require('./routes/index');

var app = express();


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://hackers-room.auth0.com/.well-known/jwks.json"
  }),
  audience: '127.0.0.1',
  issuer: "https://hackers-room.auth0.com/",
  algorithms: ['RS256']
});

app.use(jwtCheck);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end("Error")
});

//connecting to topic
client.on('connect', function () {
  client.subscribe('test')
  console.log("Connected to MQTT BROKER")
})



module.exports = app;