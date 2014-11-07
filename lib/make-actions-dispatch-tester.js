'use strict';
var _ = require('lodash');

module.exports = function() {
	return {
		__dispatches__: [],
		dispatch: function(type, payload) {
			var event = {
					type: type,
					payload: payload
				};
			this.__dispatches__.push(event);
		},
		toHaveDispatched: function(type, payload) {
			var event = {
					type: type,
					payload: payload
				},
				result = false;
			_.each(this.__dispatches__, function(dispatchedEvent) {
				if (_.isEqual(dispatchedEvent, event)) {
					result = true;
					return false;
				}
			});
			return result;
		},
		getLatestDispatch: function() {
			var length = this.__dispatches__.length - 1;
			return this.__dispatches__[length];
		},
		resetDispatches: function() {
			this.__dispatches__ = [];
		}
	}
};
