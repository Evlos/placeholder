var port = Number(process.env.PORT || 8080);

var global_count = 0;

var parseurl = require('parseurl');
var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger());

app.get('/', function(req, res) {
  res.send('API Counting: ' + global_count);
});

app.get('/*', function(req, res) {
  var args = parseurl(req).pathname.replace('/', '').split('x');
  res.writeHead(200, {'Content-Type': 'image/svg+xml'});
  res.end('<svg xmlns="http://www.w3.org/2000/svg" width="' + args[0] + '" height="' + args[1] + '" viewBox="0 0 ' + args[0] + ' ' + args[1] + '" preserveAspectRatio="none"><rect width="' + args[0] + '" height="' + args[1] + '" fill="#eee"/><text text-anchor="middle" x="64" y="16" style="fill:#aaa;font-weight:bold;font-size:12px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">' + args[0] + 'x' + args[1] + '</text></svg>');
  global_count ++;
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
