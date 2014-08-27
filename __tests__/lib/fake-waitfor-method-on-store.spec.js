'use strict';
jest.dontMock('../../lib/fake-waitfor-method-on-store');
describe('Lib.fakeWaitForMethodOnStore', function() {
	var fakeStoreInstances,
		fakeWaitForMethodOnStore;
	beforeEach(function() {
		fakeStoreInstances = require('../../lib/fake-store-instances');
		fakeWaitForMethodOnStore = require('../../lib/fake-waitfor-method-on-store');
	});
	it('should be a function', function() {
		expect(fakeWaitForMethodOnStore).toEqual(jasmine.any(Function));
	});
	describe('when called with jest, store object and other stores object', function() {
		var store;
		beforeEach(function() {
			fakeStoreInstances.mockImpl(function (jest, stores) {
				return stores;
			});
			store = {
				foo: function() {
					this.waitFor(['bar', 'baz'], function(bar, baz) {
						this.bar = bar;
						this.baz = baz;
					});
				}
			};
			fakeWaitForMethodOnStore(jest, store, { bar: "bar store", baz: "baz store" });
		});
		it('should add .waitFor() method as jest mock function on store', function() {
			expect(store.waitFor.mock).toEqual({ calls: [], instances: [] });
		});
		it('when store method that implements .waitFor() is called with array of store names and a callback, it should call the callback with the stores and preseve the "this" reference', function() {
			store.foo();
			expect(store.bar).toBe('bar store');
			expect(store.baz).toBe('baz store');
		});
	});
});
