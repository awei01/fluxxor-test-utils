'use strict';
var transformStoresToFakeInstances = require('./transform-stores-to-fake-instances');
module.exports = function(jest, flux) {
	var key;
	transformStoresToFakeInstances(flux.stores);
	for (key in flux.actions) {
		if (typeof flux.actions[key] === 'function') {
			flux.actions[key] = jest.genMockFn();
		}
	}
	return flux;
};
