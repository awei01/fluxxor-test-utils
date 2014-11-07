'use strict';
var _ = require('lodash'),
	Flux = require('fluxxor/lib/flux'),
	makeStoreEmitTester = require('./make-store-emit-tester'),
	makeActionsDispatchTester = require('./make-actions-dispatch-tester');

var extend = {
	testStore: function(name, store) {
		this.addStore(name, store);
		_.assign(store, makeStoreEmitTester());
		return store;
	},
	testActions: function(actions) {
		var tester = makeActionsDispatchTester();
		_.assign(this.dispatchBinder, tester);
		this.addActions(actions);
		return tester;
	}
}

module.exports = function(stores, actions) {
	var instance = new Flux(stores, actions);

	_.assign(instance, extend);

	return instance;
};
