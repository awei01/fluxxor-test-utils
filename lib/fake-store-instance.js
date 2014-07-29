'use strict';
module.exports = function(jest, store) {
	var result = {}, method;
	if (typeof store === 'function') {
		store = new store();
	}
	for (method in store) {
		if (typeof store[method] === 'function') {
			result[method] = jest.genMockFn();
		} else {
			result[method] = store[method];
		}
	}
	return result;
};
