'use strict';
var Spy = require('./spy');
var StoreEmitSpy = function(store) {
	Spy.call(this);
	store.emit = this.__captureCall.bind(this);
};
StoreEmitSpy.prototype = new Spy();
module.exports = StoreEmitSpy;
