'use strict';
var _ = require('lodash');
var ActionsDispatchWatcher = function(binder) {
	binder.dispatch = this.__captureDispatch.bind(this);
};
ActionsDispatchWatcher.prototype.__dispatches__ = [];
ActionsDispatchWatcher.prototype.__captureDispatch = function(type, payload) {
	var event = { type: type, payload: payload };
	this.__dispatches__.push(event);
};
ActionsDispatchWatcher.prototype.caughtDispatch = function(type, payload) {
	var event = { type: type, payload: payload },
		result = false;
	_.each(this.__dispatches__, function(dispatchedEvent) {
		if (_.isEqual(dispatchedEvent, event)) {
			result = true;
			return false;
		}
	});
	return result;
};
ActionsDispatchWatcher.prototype.getLast = function() {
	var length = this.__dispatches__.length - 1;
	return this.__dispatches__[length];
},
ActionsDispatchWatcher.prototype.reset = function() {
	this.__dispatches__.length = 0;
}
module.exports = ActionsDispatchWatcher;
