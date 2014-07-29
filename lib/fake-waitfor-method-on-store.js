'use strict';
var transformStoresToFakeInstances = require('./transform-stores-to-fake-instances');

module.exports = function(jest, store, stores) {
	var fakes = transformStoresToFakeInstances(jest, stores);
	store.waitFor = jest.genMockFn().mockImpl(function(names, callback) {
		var waits = names.map(function(name) {
				return fakes[name];
			});
		callback.apply(store, waits);
	});
};
