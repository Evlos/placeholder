var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger());
app.use(express.static(__dirname + '/assets'));
app.use(function(req, res){
  res.send('Running ...');
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
