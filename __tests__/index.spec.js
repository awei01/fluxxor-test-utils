'use strict';
jest.dontMock('util');
jest.dontMock('./stubs/foo-store');
jest.dontMock('./stubs/actions');
jest.dontMock('../lib/spy');
jest.dontMock('../lib/store-emit-spy');
jest.dontMock('../lib/actions-dispatch-spy');
jest.dontMock('../lib/fake-flux'),
jest.dontMock('../lib/jasmine-matchers'),
jest.dontMock('../lib/jest-utils'),
jest.dontMock('../index');
describe('Index', function() {
	var FooStore, Actions, Events,
		FakeFlux, JestUtils,
		Index;
	beforeEach(function() {
		FooStore = require('./stubs/foo-store');
		Actions = require('./stubs/actions');
		Events = require('./stubs/events');

		FakeFlux = require('../lib/fake-flux');
		JestUtils = require('../lib/jest-utils');

		Index = require('../index');
	});
	it('should be an object', function() {
		expect(Index).toEqual(jasmine.any(Object));
	});
	describe('.extendJasmineMatchers()', function() {
		it('when called with no params, should throw error', function() {
			expect(function() {
				Index.extendJasmineMatchers();
			}).toThrow('extendJasmineMatchers() requires current instance of jasmine as a parameter');
		});
		describe('when called with jasmine', function() {
			var result;
			beforeEach(function() {
				result = Index.extendJasmineMatchers(this);
			});
			it('should return itself so it can be chained', function() {
				expect(result).toBe(Index);
			});
			it('when .toHaveEmitted() used on something other than a store spy, should throw error', function() {
				expect(function() {
					expect('foo').toHaveEmitted();
				}).toThrow('toHaveEmitted() should be used on a StoreEmitSpy');
			});
			it('when .lastEmittedWith() used on something other than a store spy, should throw error', function() {
				expect(function() {
					expect('foo').lastEmittedWith();
				}).toThrow('lastEmittedWith() should be used on a StoreEmitSpy');
			});
			it('when .lastDispatchedWith() used on something other than a actions spy, should throw error', function() {
				expect(function() {
					expect('foo').lastDispatchedWith();
				}).toThrow('lastDispatchedWith() should be used on an ActionsDispatchSpy');
			});
			describe('result of .fakeFlux() when called with stores and actions', function() {
				var fooStore, fakeFlux;
				beforeEach(function() {
					fooStore = new FooStore();
					fakeFlux = Index.fakeFlux({ FooStore: fooStore }, Actions);
				});
				it('should be an instance of FakeFlux', function() {
					expect(fakeFlux instanceof FakeFlux).toBe(true);
				});
				describe('when store spy created', function() {
					var storeSpy;
					beforeEach(function() {
						storeSpy = fakeFlux.makeStoreEmitSpy('FooStore');
					});
					it('store spy should capture .emit() calls', function() {
						fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: {} });
						expect(storeSpy.getLastCall()).toEqual(['foo change']);
					});
					describe('extended jasmine matcher methods', function() {
						it('.toHaveEmitted() should pass when any .emit() call occurs', function() {
							expect(storeSpy).not.toHaveEmitted();
							fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: {} });
							expect(storeSpy).toHaveEmitted();
						});
						it('.lastEmittedWith() should pass when event last emitted is matched', function() {
							expect(storeSpy).not.lastEmittedWith('foo change');
							fakeFlux.dispatcher.dispatch({ type: Events.FOO_EVENT, payload: {} });
							expect(storeSpy).lastEmittedWith('foo change');
						});
						it('.lastEmittedWith() should throw error when no event passed', function() {
							expect(function() {
								expect(storeSpy).lastEmittedWith();
							}).toThrow('lastEmittedWith() requires exactly one parameter');
						});
					});
				});
				describe('when actions spy created', function() {
					var actionsSpy;
					beforeEach(function() {
						actionsSpy = fakeFlux.makeActionsDispatchSpy();
					});
					it('when actions action called, actions spy should capture .dispatch() call', function() {
						fakeFlux.actions.doFooAction('foo');
						expect(actionsSpy.getLastCall()).toEqual([ Events.FOO_EVENT, { value: "foo" } ]);
					});
					describe('extended jasmine matcher methods', function() {
						it('.lastDispatchedWith() should pass when any .dispatch() call occurs with matching type and payload', function() {
							fakeFlux.actions.doFooAction('foo');
							expect(actionsSpy).lastDispatchedWith(Events.FOO_EVENT, { value: "foo" });
							expect(actionsSpy).not.lastDispatchedWith('invalid event', { value: "foo" });
							expect(actionsSpy).not.lastDispatchedWith(Events.FOO_EVENT, { value: "invalid value" });
						});
					});
				});
			});
		});
	});
	it('.getJestUtils() should return JestUtils', function() {
		expect(Index.getJestUtils()).toBe(JestUtils);
	});
});
