'use strict';
var FakeFlux = require('./lib/fake-flux'),
	JasmineMatchers = require('./lib/jasmine-matchers'),
	JestUtils = require('./lib/jest-utils');

module.exports = {
	fakeFlux: function(stores, actions) {
		return new FakeFlux(stores, actions);
	},
	extendJasmineMatchers: function(jasmine) {
		if (!jasmine) {
			throw new Error('extendJasmineMatchers() requires current instance of jasmine as a parameter');
		}
		jasmine.addMatchers(JasmineMatchers);
		return this;
	},
	getJestUtils: function() {
		return JestUtils;
	}
}
