'use strict';
jest.dontMock('util');
jest.dontMock('../stubs/foo-store');
jest.dontMock('../stubs/actions');
jest.dontMock('../../lib/spy');
jest.dontMock('../../lib/store-emit-spy');
jest.dontMock('../../lib/actions-dispatch-spy');
jest.dontMock('../../lib/jest-utils');
jest.dontMock('../../lib/fake-flux');
describe('Lib.FakeFlux', function() {
	var Flux,
		FooStore, Actions, Events,
		JestUtils,
		FakeFlux;
	beforeEach(function() {
		Flux = require('fluxxor/lib/flux');

		FooStore = require('../stubs/foo-store');
		Actions = require('../stubs/actions');
		Events = require('../stubs/events');

		JestUtils = require('../../lib/jest-utils');

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
		describe('result when .makeStoreEmitSpy() called with existing store', function() {
			var fooStore, spy;
			beforeEach(function() {
				fooStore = new FooStore();
				fakeFlux.addStore('FooStore', fooStore);
				spy = fakeFlux.makeStoreEmitSpy('FooStore');
			});
			it('when .dispatcher dispatches action that the store listens to, it should perform store actions', function() {
				fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: { value: "foo" } });
				expect(fooStore.getValue()).toBe('foo');
			});
			it('when .dispatcher dispatches action that the store listens to and subsequently calls .emit() with event, spy should catch the emitted event', function() {
				fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: { value: "foo" } });
				expect(spy.getLastCall()).toEqual(['foo change']);
			});
		});
		it('when .makeStoreEmitSpy() called with non-existent store, should throw Error', function() {
			expect(function() {
				fakeFlux.makeStoreEmitSpy('invalid');
			}).toThrow('Cannot spy on undefined store [invalid]');
		});
		describe('result when .makeActionsDispatchSpy() called when actions set', function() {
			var spy;
			beforeEach(function() {
				fakeFlux.addActions(Actions);
				spy = fakeFlux.makeActionsDispatchSpy();
			});
			it('when .actions method called that calls .dispatch(), spy should catch the dispatched event', function() {
				fakeFlux.actions.doFooAction('foo');
				expect(spy.getLastCall()).toEqual([ Events.FOO_EVENT, { value: "foo" } ]);
			});
		});
		it('when .makeActionsDispatchSpy() called when actions are empty, should throw Error', function() {
			fakeFlux.actions = {};
			expect(function() {
				fakeFlux.makeActionsDispatchSpy();
			}).toThrow('Cannot spy on undefined actions');
		});
		describe('.genMocksForStore()', function() {
			var fooStore, otherFooStore;
			beforeEach(function() {
				fooStore = new FooStore();
				otherFooStore = new FooStore();
				fakeFlux.addStores({ FooStore: fooStore, OtherFooStore: otherFooStore });
			});
			describe('when called with specific store name', function() {
				beforeEach(function() {
					fakeFlux.genMocksForStore('FooStore');
				});
				it('should mock "public" methods', function() {
					expect(fooStore.getValue.mock.calls).toEqual([]);
				});
				it('should not mock "protected" (underscore prefixed) methods and ignore properties', function() {
					fooStore._handleFooEvent({ value: "foo" });
					expect(fooStore._value).toBe("foo");
				});
				it('should not mock unspecified stores', function() {
					expect(otherFooStore.getValue.mock).toBe(undefined);
				});
			});
			it('when called with store names, should mock all of the stores', function() {
				fakeFlux.genMocksForStore('FooStore', 'OtherFooStore');
				expect(fooStore.getValue.mock.calls).toEqual([]);
				expect(otherFooStore.getValue.mock.calls).toEqual([]);
			});
			it('when called with *, should mock all of the stores', function() {
				fakeFlux.genMocksForStore('*');
				expect(fooStore.getValue.mock.calls).toEqual([]);
				expect(otherFooStore.getValue.mock.calls).toEqual([]);
			});
			it('when called with non-existing store, should throw exception', function() {
				expect(function() {
					fakeFlux.genMocksForStore('Invalid');
				}).toThrow('genMocksForStore() cannot mock invalid store [Invalid]');
			});
			it('when called with store, should return self', function() {
				var result = fakeFlux.genMocksForStore('FooStore');
				expect(result).toBe(fakeFlux);
			});
		});
		describe('.genMocksForActions()', function() {
			it('when called, should mock actions', function() {
				fakeFlux.addActions(Actions);
				fakeFlux.genMocksForActions();
				expect(fakeFlux.actions.doFooAction.mock.calls).toEqual([]);
			});
			it('when called, should mock namespaced actions', function() {
				fakeFlux.addAction(['some', 'namespace', 'doAction'], function() { } );
				fakeFlux.genMocksForActions();
				expect(fakeFlux.actions.some.namespace.doAction.mock.calls).toEqual([]);
			});
			it('when called when actions are empty, should throw error', function() {
				expect(function() {
					fakeFlux.genMocksForActions();
				}).toThrow('genMocksForActions() cannot find actions to mock');
			});
			it('when called, should return self', function() {
				fakeFlux.addActions(Actions);
				var result = fakeFlux.genMocksForActions();
				expect(result).toBe(fakeFlux);
			});
		});
		describe('.genMocksForStoresAndActions()', function() {
			beforeEach(function() {
				fakeFlux.genMocksForStore = jest.genMockFn();
				fakeFlux.genMocksForActions = jest.genMockFn();
			});
			it('when called should call .genMocksForStore() with * and .genMocksForActions() on self', function() {
				fakeFlux.genMocksForStoresAndActions();
				expect(fakeFlux.genMocksForStore).lastCalledWith('*');
				expect(fakeFlux.genMocksForActions).lastCalledWith();
			});
			it('when called, should return self', function() {
				var result = fakeFlux.genMocksForStoresAndActions();
				expect(result).toBe(fakeFlux);
			});
		});
	});
	describe('result when instantiated with a flux instance', function() {
		var flux, fakeFlux;
		beforeEach(function () {
			flux = new Flux({ FooStore: new FooStore() }, Actions);
			fakeFlux = new FakeFlux(flux);
		});
		it('.makeStoreEmitSpy() should work', function() {
			var spy = fakeFlux.makeStoreEmitSpy('FooStore');
			fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: { value: "foo" } });
			expect(spy.getLastCall()).toEqual(['foo change']);
		});
	});
});
