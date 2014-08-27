'use strict';
var fakeStoreInstances = require('./fake-store-instances');

module.exports = function(jest, stores, actions) {
	var fakes = fakeStoreInstances(jest, stores);
	return {
		store: jest.genMockFn().mockImpl(function(name) {
			return fakes[name];
		}),
		actions: actions
	};
};
