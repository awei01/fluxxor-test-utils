'use strict';
var fakeStoreInstances = require('./fake-store-instances');

module.exports = function(jest, store, stores) {
	var fakes = fakeStoreInstances(jest, stores);
	store.waitFor = jest.genMockFn().mockImpl(function(names, callback) {
		var waits = names.map(function(name) {
				return fakes[name];
			});
		callback.apply(store, waits);
	});
};
