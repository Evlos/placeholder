var port = Number(process.env.PORT || 8080);

var fs = require('fs');
var parseurl = require('parseurl');
var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger());

app.get('/', function(req, res) {
  res.send('Running ...');
});

app.get('/*', function(req, res) {
  var path = parseurl(req).pathname;
  var data;
  try {
    data = fs.readFileSync('assets/' + path.replace('/', '') + '.svg');
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.end(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.send('File not found!');
    } else {
      throw e;
    }
  }
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
