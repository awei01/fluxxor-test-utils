'use strict';
var _ = require('lodash'),
	Flux = require('fluxxor/lib/flux'),
	StoreEmitSpy = require('./store-emit-spy'),
	ActionsDispatchSpy = require('./actions-dispatch-spy'),
	JestUtils = require('./jest-utils');

var FakeFlux = function(fluxOrStores, actions) {
	var stores;
	if (fluxOrStores instanceof Flux) {
		stores = fluxOrStores.stores;
		actions = fluxOrStores.actions;
	} else {
		stores = fluxOrStores;
	}
	Flux.call(this, stores, actions);
};
FakeFlux.prototype = new Flux();

FakeFlux.prototype.makeStoreEmitSpy = function(name) {
	var store = this.store(name),
		spy;
	if (!store) {
		throw new Error('Cannot spy on undefined store [' + name + ']');
	}
	spy = new StoreEmitSpy(store);
	return spy;
};
FakeFlux.prototype.makeActionsDispatchSpy = function() {
	var spy;
	if (_.isEmpty(this.actions)) {
		throw new Error('Cannot spy on undefined actions');
	}
	spy = new ActionsDispatchSpy(this.dispatchBinder);
	return spy;
};
FakeFlux.prototype.genMocksForStore = function() {
	var names = Array.prototype.slice.call(arguments);
	if (names[0] === '*') {
		names = _.keys(this.stores);
	}
	_.each(names, function(name) {
		var current = this.store(name);
		if (!current) {
			throw new Error('genMocksForStore() cannot mock invalid store [' + name + ']');
		}
		JestUtils.mockObjectWithJest(current);
	}, this);
	return this;
};
FakeFlux.prototype.genMocksForActions = function() {
	if (_.isEmpty(this.actions)) {
		throw new Error('genMocksForActions() cannot find actions to mock');
	}
	JestUtils.mockObjectWithJest(this.actions);
};

module.exports = FakeFlux;
