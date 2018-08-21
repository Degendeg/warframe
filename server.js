var express = require('express');
var app = express();
var server = require('http').createServer(app);
var Items = require('warframe-items');
var items = new Items();
var port = process.env.PORT || 3005;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

app.get('/items', function(req, res) {
  res.send(items);
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});