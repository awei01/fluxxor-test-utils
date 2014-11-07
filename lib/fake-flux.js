'use strict';
var _ = require('lodash'),
	inherits = require('inherits'),
	Flux = require('fluxxor/lib/flux'),
	StoreEmitWatcher = require('./store-emit-watcher'),
	ActionsDispatchWatcher = require('./actions-dispatch-watcher');

var FakeFlux = function(stores, actions) {
	Flux.call(this, stores, actions);
};

inherits(FakeFlux, Flux);

FakeFlux.prototype.makeStoreEmitWatcher = function(name) {
	var store = this.store(name),
		watcher;
	if (!store) {
		throw new Error('Cannot watch undefined store [' + name + ']');
	}
	watcher = new StoreEmitWatcher(store);
	return watcher;
};
FakeFlux.prototype.makeActionsDispatchWatcher = function() {
	var actions = _.clone(this.actions),
		watcher;
	if (_.isEmpty(actions)) {
		throw new Error('Cannot watch undefined actions');
	}
	this.actions = {};
	watcher = new ActionsDispatchWatcher(this.dispatchBinder);
	this.addActions(actions);
	return watcher;
};

module.exports = FakeFlux;
