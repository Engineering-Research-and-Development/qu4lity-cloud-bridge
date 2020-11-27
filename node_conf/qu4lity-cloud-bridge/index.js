const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const path = require("path");
const errorhandler = require('errorhandler');

//require('dotenv').config();
const config = require("./config");

var isProduction = config.stage;

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(require('method-override')());

if (!isProduction) {
  app.use(errorhandler());
}

/// catch 404 and forward to error handler
app.use(require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.listen(config.port, function () {
  console.log("QU4LITY Cloud Rest Bridge server is up and running and it's listening on port:" + config.port);
});

