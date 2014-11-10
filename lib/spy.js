'use strict';
var Spy = function() {
};
Spy.prototype.__calls__ = [];
Spy.prototype.__captureCall = function() {
	var args = Array.prototype.slice.call(arguments);
	this.__calls__.push(args);
};
Spy.prototype.getCalls = function() {
	return this.__calls__;
};
Spy.prototype.getLastCall = function() {
	return this.__calls__[this.__calls__.length - 1];
};
Spy.prototype.resetCalls = function() {
	this.__calls__.length = 0;
};
module.exports = Spy;
