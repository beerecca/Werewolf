/* global require */
var Hapi = require('hapi');
var routes = require('./routes');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 3003
});

server.route(routes);

server.start(function(err) {
	console.log(err || 'Started Hapi server at http://localhost:3003/');
});