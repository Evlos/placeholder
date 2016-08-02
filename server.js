var port = Number(process.env.PORT || 60081);

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
  var width = args[0];
  var height = args[1];
  var font_size = Math.round(Math.max(12, Math.min(Math.min(args[0], args[1]) * 0.75, 0.75 * Math.max(args[0], args[1]) / 12)))
  res.writeHead(200, {'Content-Type': 'image/svg+xml'});
  res.end('<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none"><rect width="' + width + '" height="' + height + '" fill="#eee"/><text text-anchor="middle" x="' + width/2 + '" y="' + height/2 + '" style="fill:#aaa;font-weight:bold;font-size:' + font_size + 'px;font-family:Arial,Helvetica,sans-serif;dominant-baseline:central">' + width + 'x' + height + '</text></svg>');
  global_count ++;
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
