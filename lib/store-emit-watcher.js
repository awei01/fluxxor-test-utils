'use strict';
var StoreEmitWatcher = function(store) {
	store.emit = this.__captureEmit.bind(this);
};
StoreEmitWatcher.prototype.__emits__ = [];
StoreEmitWatcher.prototype.__captureEmit = function(event) {
	this.__emits__.push(event);
};
StoreEmitWatcher.prototype.caughtEmit = function(event) {
	var i, length = this.__emits__.length;
	for (i = 0; i < length; i ++) {
		if (this.__emits__[i] === event) {
			return true;
		}
	}
	return false;
};
StoreEmitWatcher.prototype.getLast = function() {
	var length = this.__emits__.length - 1;
	return this.__emits__[length];
};
StoreEmitWatcher.prototype.reset = function() {
	this.__emits__.length = 0;
}
module.exports = StoreEmitWatcher;
