'use strict';
var FakeFlux = require('./lib/fake-flux');
module.exports = {
	fakeFlux: function(stores, actions) {
		return new FakeFlux(stores, actions);
	}
}
