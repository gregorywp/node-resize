const crop_resize = require('./crop-resize');

const express = require('express');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(morgan('combined'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/crop-resize/', function (req, res) {
  crop_resize(req.body.url,req.body.size,req.body.hash, function (newImage) {
    res.send({newImage : newImage});
  });
});

var server = app.listen(8082, function() {
  console.log('Server listening on port ' + server.address().port);
});