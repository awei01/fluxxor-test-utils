'use strict';
jest.dontMock('util');
jest.dontMock('../stubs/foo-store');
jest.dontMock('../stubs/bar-store');
jest.dontMock('../stubs/actions');
jest.dontMock('../../lib/fake-flux');
jest.dontMock('../../lib/make-store-emit-tester');
jest.dontMock('../../lib/make-actions-dispatch-tester');
describe('Lib.fakeFlux()', function() {
	var Flux, Store,
		FooStore, BarStore, Actions, MyEvents,
		fakeFlux;
	beforeEach(function() {
		Flux = require('fluxxor/lib/flux');
		Store = require('fluxxor/lib/store');

		FooStore = require('../stubs/foo-store');
		BarStore = require('../stubs/bar-store');
		Actions = require('../stubs/actions');
		MyEvents = require('../stubs/events');

		fakeFlux = require('../../lib/fake-flux');
	});
	it('should be a function', function() {
		expect(fakeFlux).toEqual(jasmine.any(Function));
	});
	describe('result when instantiated', function() {
		var fake;
		beforeEach(function() {
			fake = fakeFlux();
		});
		it('should be an instance of Fluxxor.Lib.Flux', function() {
			expect(fake instanceof Flux).toBe(true);
		});
		describe('.testStore() called with name and store instance', function() {
			var fooStore;
			beforeEach(function() {
				fooStore = fake.testStore('FooStore', new FooStore());
			});
			it('should be an instance of Fluxxor.Lib.Store', function() {
				expect(fooStore instanceof Store).toBe(true);
			});
			it('should add the store to .stores', function() {
				expect(fake.stores.FooStore).toBe(fooStore);
			});
			it('when dispatcher called with action that emits an event, store should handle action and capture emitted event', function() {
				fake.dispatcher.dispatch({ type: MyEvents.FOO_EVENT, payload: { value: "foo value" } });
				expect(fooStore.getValue()).toBe('foo value');
				expect(fooStore.toHaveEmitted('foo'));
			});
			describe('when another store is isolated for test', function() {
				var barStore;
				beforeEach(function() {
					barStore = fake.testStore('BarStore', new BarStore());
				});
				it('should add the store to .stores', function() {
					expect(fake.stores.BarStore).toBe(barStore);
				});
				it('when dispatcher called with action that emits event, should not affect the events emitted on other store', function() {
					fake.dispatcher.dispatch({ type: MyEvents.BAR_EVENT, payload: { value: "bar value" } });
					expect(barStore.getValue()).toBe('bar value');
					expect(fooStore.toHaveEmitted('bar')).toBe(false);
					expect(barStore.toHaveEmitted('bar')).toBe(true);
				});
			});
		});
		describe('.testActions() called with actions object', function() {
			var tester;
			beforeEach(function() {
				tester = fake.testActions(Actions);
			});
			it('should add the actions to flux.actions', function() {
				expect(fake.actions.doFooAction).toEqual(jasmine.any(Function));
			});
			it('when action that calls .dispatch() called, should log the dispatched event', function() {
				fake.actions.doFooAction('foo');
				expect(tester.getLatestDispatch()).toEqual({ type: MyEvents.FOO_EVENT, payload: { value: "foo" } });
			});
			it('when .resetDispatches() called and action that calls .dispatch() called, should log the dispatched event', function() {
				tester.resetDispatches();
				fake.actions.doFooAction('foo');
				expect(tester.getLatestDispatch()).toEqual({ type: MyEvents.FOO_EVENT, payload: { value: "foo" } });
			});
		});
	});
});
