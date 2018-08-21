var express = require('express');
var app = express();
var server = require('http').createServer(app);
var basicAuth = require('express-basic-auth');
var Items = require('warframe-items');
var items = new Items();
var port = process.env.PORT || 3005;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

app.get('/items', basicAuth({
  users: {
    'Frisk999': 'Mobil12345'
  },
  challenge: true,
  realm: 'Imb4T3st4pp',
  unauthorizedResponse: function getUnauthorizedResponse(req) {
    return req.auth ?
      ('Credentials rejected.') :
      'No credentials provided.'
  }
}), function(req, res) {
	res.send(items);
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});