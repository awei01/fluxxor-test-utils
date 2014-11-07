'use strict';
jest.dontMock('util');
jest.dontMock('../stubs/foo-store');
jest.dontMock('../stubs/actions');
jest.dontMock('../../lib/fake-flux');
jest.dontMock('../../lib/store-emit-watcher');
jest.dontMock('../../lib/actions-dispatch-watcher');
describe('Lib.FakeFlux', function() {
	var Flux,
		FooStore, Actions, Events,
		FakeFlux;
	beforeEach(function() {
		Flux = require('fluxxor/lib/flux');

		FooStore = require('../stubs/foo-store');
		Actions = require('../stubs/actions');
		Events = require('../stubs/events');

		FakeFlux = require('../../lib/fake-flux');
	});
	it('should be a function', function() {
		expect(FakeFlux).toEqual(jasmine.any(Function));
	});
	describe('result when instantiated', function() {
		var fakeFlux;
		beforeEach(function() {
			fakeFlux = new FakeFlux();
		});
		it('should be an instance of Flux', function() {
			expect(fakeFlux instanceof Flux).toBe(true);
		});
		describe('result when .makeStoreEmitWatcher() called with existing store', function() {
			var fooStore, watcher;
			beforeEach(function() {
				fooStore = new FooStore();
				fakeFlux.addStore('FooStore', fooStore);
				watcher = fakeFlux.makeStoreEmitWatcher('FooStore');
			});
			it('when .dispatcher dispatches action the store listens to, it should perform store actions', function() {
				fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: { value: "foo" } });
				expect(fooStore.getValue()).toBe('foo');
			});
			it('when .dispatcher dispatches action which store subsequently calls .emit() with event, watcher should catch the emitted event', function() {
				fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: { value: "foo" } });
				expect(watcher.getLast()).toBe('foo change');
			});
			it('when .makeStoreEmitWatcher() called with non-existent store, should throw Error', function() {
				expect(function() {
					fakeFlux.makeStoreEmitWatcher('invalid');
				}).toThrow('Cannot watch undefined store [invalid]');
			});
		});
		describe('result when .makeActionsDispatchWatcher() called when actions set', function() {
			var watcher;
			beforeEach(function() {
				fakeFlux.addActions(Actions);
				watcher = fakeFlux.makeActionsDispatchWatcher();
			});
			it('when .actions method called, should catch the dispatched event', function() {
				fakeFlux.actions.doFooAction('foo');
				expect(watcher.getLast()).toEqual({ type: Events.FOO_EVENT, payload: { value: "foo" } });
			});
			it('when .makeActionsDispatchWatcher() called when actions are empty, should throw Error', function() {
				fakeFlux.actions = {};
				expect(function() {
					fakeFlux.makeActionsDispatchWatcher();
				}).toThrow('Cannot watch undefined actions');
			});
		});
	});
});
