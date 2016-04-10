var path = require('path');
var rolesServiceEndpoint = '/roles';
var rolesData = require('./rolesMockData');

var maxLoadDelay = 3000;
var minLoadDelay = 1000;

/**
 * @private
 * @param {object} request HTTP object
 * @param {number} page Page number
 * @param {number} limit The number of results to limit to
 * @returns {object} Reply envelope
 */
function getReplyEnvelope(request, page, limit) {
	var result = {};
	return result;
}

/**
 * @private
 * @param {object} request HTTP object
 * @returns {object} Reply data
 **/
function getReply(request, data) {
	var page = parseInt(request.query.page, 10) || 1;
	var limit = parseInt(request.query.limit, 10) || 25;
	var envelope;

	envelope = getReplyEnvelope(request, page, limit);
	envelope = data;

	return envelope;
}

/**
 * @private
 * Returns a load delay using the defaults defined in this file
 * @returns {Number} time value (in ms)
 */
function getLoadDelay() {
	return generateLoadDelay(minLoadDelay, maxLoadDelay);
}

/**
 * @private
 * Generates a delay time value
 * @param {Number} minLoadDelay Minimum loading delay
 * @param {Number} maxLoadDelay Maximum load delay
 * @returns {Number} time value (in ms)
 */
function generateLoadDelay(minLoadDelay, maxLoadDelay) {
	return Math.max(minLoadDelay, Math.random() * maxLoadDelay);
}

module.exports = [
	{
		method: 'GET',
		path: '/{component*}',
		config: {
			description: 'General static file handler'
		},
		handler: function (request, reply) {
			reply.file(path.join('.', request.url.pathname));
		}
	},
	{
		method: 'GET',
		path: '/bower_components/{component*}',
		config: {
			description: 'General static file handler for bower components'
		},
		handler: function (request, reply) {
			reply.file(path.join('.', request.url.pathname));
		}
	},
	{
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply.redirect('/index.html');
		}
	},
	{
		method: 'GET',
		path: rolesServiceEndpoint,
		config: {
			description: 'Returns list of roles'
		},
		handler: function (request, reply) {
			setTimeout(function () {
				var r = getReply(request, rolesData);
				var response = reply(r);

				response.header('Access-Control-Allow-Origin', '*');
				response.header('Access-Control-Allow-Headers', 'X-Requested-With');
			}, getLoadDelay());

		}
	}
];
