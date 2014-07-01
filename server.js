var port = Number(process.env.PORT || 8080);
var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger());
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  res.send('Running ...');
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
