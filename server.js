var express = require('express');
var app = express();
var server = require('http').createServer(app);
var basicAuth = require('express-basic-auth');
var mcache = require('memory-cache');
var Items = require('warframe-items');
var items = new Items();
var port = process.env.PORT || 3005;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

app.get('/weapons', function(req, res) {
  res.sendFile(__dirname + '/public/weapons.html');
});

var cache = (duration) => {
	return (req, res, next) => {
		let key = '__express__' + req.originalUrl || req.url;
		let cachedBody = mcache.get(key);
		if (cachedBody) {
			res.send(cachedBody);
			return;
		}
		else {
			res.sendResponse = res.send;
			res.send = (body) => {
				mcache.put(key, body, duration * 1000);
				res.sendResponse(body);
			}
			next();
		}
	}
}

// app.get('/items', cache(10), basicAuth({
  // users: {
    // 'urbz': 'seiko12345'
  // },
  // challenge: false,
  // realm: 'Imb4T3st4pp',
  // unauthorizedResponse: function getUnauthorizedResponse(req) {
    // return req.auth ?
      // ('Credentials rejected.') :
      // 'No credentials provided.'
  // }
// }), function(req, res) {
	// res.send(items);
// });

app.get('/items', function(req, res) {
	res.send(items);
});

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});