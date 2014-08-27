'use strict';
var fakeStoreInstances = require('./fake-store-instances');

module.exports = function(jest, flux) {
	var key;
	fakeStoreInstances(jest, flux.stores);
	for (key in flux.actions) {
		if (typeof flux.actions[key] === 'function') {
			flux.actions[key] = jest.genMockFn();
		}
	}
	return flux;
};
