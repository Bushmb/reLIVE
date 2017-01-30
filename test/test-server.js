/* jshint esversion: 6 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();
const app = server.app;

chai.use(chai.Http);

describe('server response for index', function() {

	it('should return 200', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.html;
			});
	});
});