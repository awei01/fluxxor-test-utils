'use strict';
var _ = require('lodash'),
	ActionsDispatchSpy = require('./actions-dispatch-spy'),
	StoreEmitSpy = require('./store-emit-spy');
module.exports = {
	toHaveEmitted: function() {
		var spy = this.actual;
		if (!(spy instanceof StoreEmitSpy)) {
			throw new Error('toHaveEmitted() should be used on a StoreEmitSpy');
		}
		return spy.__calls__.length > 0;
	},
	lastEmittedWith: function(event) {
		var spy = this.actual,
			call, last;
		if (!(spy instanceof StoreEmitSpy)) {
			throw new Error('lastEmittedWith() should be used on a StoreEmitSpy');
		}
		if (arguments.length !== 1) {
			throw new Error('lastEmittedWith() requires exactly one parameter');
		}
		call = this.actual.getLastCall();
		last = call && call[0];
		return last === event;
	},
	lastDispatchedWith: function(type, payload) {
		var spy = this.actual,
			call;
		if (!(spy instanceof ActionsDispatchSpy)) {
			throw new Error('lastDispatchedWith() should be used on an ActionsDispatchSpy');
		}
		call = this.actual.getLastCall();
		return call[0] === type && _.isEqual(call[1], payload);

	}
};
