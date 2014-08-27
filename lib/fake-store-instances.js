'use strict';
var fakeStoreInstance = require('./fake-store-instance');

module.exports = function(jest, stores) {
	var name, store;
	for (name in stores) {
		store = stores[name];
		stores[name] = fakeStoreInstance(jest, store);
	}
	return stores;
};
