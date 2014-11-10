'use strict';
var Spy = require('./spy');
var ActionsDispatchSpy = function(binder) {
	Spy.call(this);
	binder.dispatch = this.__captureCall.bind(this);
};
ActionsDispatchSpy.prototype = new Spy();

module.exports = ActionsDispatchSpy;
