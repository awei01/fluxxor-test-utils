'use strict';
var transformStoresToFakeStoreInstances = require('./transform-stores-to-fake-instances');

module.exports = function(jest, stores, actions) {
	var fakes = transformStoresToFakeStoreInstances(jest, stores);
	return {
		store: jest.genMockFn().mockImpl(function(name) {
			return fakes[name];
		}),
		actions: actions
	};
};
