'use strict';
var transformStoresToFakeStoreInstances = require('./transform-stores-to-fake-store-instances');

module.exports = function(jest, store, stores) {
	var fakes = transformStoresToFakeStoreInstances(jest, stores);
	store.waitFor = jest.genMockFn().mockImpl(function(names, callback) {
		var waits = names.map(function(name) {
				return fakes[name];
			});
		callback.apply(store, waits);
	});
};
