'use strict';
var _ = require('lodash');
var __jest__;
var mockObjectWithJest = function(object) {
	_.forIn(object, function(value, key) {
		var jestInstance;
		if (key.charAt(0) === '_') {
			return;
		} else if (_.isPlainObject(value)) {
			mockObjectWithJest(value);
			return;
		} else if (_.isFunction(value)) {
			jestInstance = getJest();
			object[key] = jestInstance.genMockFn();
		}
	});
};
var validateJest = function(jest) {
	if (!_.isObject(jest) || !_.isFunction(jest.genMockFn)) {
		throw new Error('Invalid jest');
	}
}
var getJest = function() {
	var result = __jest__ || jest;
	if (!result) {
		throw new Error('Jest must be available via global variable or explicitly set with .setJest()');
	}
	return result;
}

module.exports = {
	setJest: function(jest) {
		validateJest(jest);
		__jest__ = jest;
	},
	getJest: getJest,
	mockObjectWithJest: mockObjectWithJest
}
