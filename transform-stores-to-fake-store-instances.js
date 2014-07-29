'use strict';
var fakeStore = require('./fake-store');

module.exports = function(jest, stores) {
	var name, store;
	for (name in stores) {
		store = stores[name];
		stores[name] = fakeStore(jest, store);
	}
	return stores;
};
