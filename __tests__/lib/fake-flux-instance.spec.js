'use strict';
jest.dontMock('../../lib/fake-flux-instance.js');
describe('Lib.fakeFluxInstance', function() {
	var transformStoresToFakeInstances,
		fakeFluxInstance;
	beforeEach(function() {
		transformStoresToFakeInstances = require('../../lib/transform-stores-to-fake-instances');
		fakeFluxInstance = require('../../lib/fake-flux-instance');
	});
	it('should be a function', function() {
		expect(fakeFluxInstance).toEqual(jasmine.any(Function));
	});
	describe('when called with jest, stores object and actions object', function() {
		var result;
		beforeEach(function() {
			transformStoresToFakeInstances.mockImpl(function (jest, stores) {
				return stores;
			});
			result = fakeFluxInstance(jest, { foo: "foo store" }, { bar: "bar action" });
		});
		it('should return an object', function() {
			expect(result).toEqual(jasmine.any(Object));
		});
		it('should set the .actions property with actions object', function() {
			expect(result.actions).toEqual({ bar: "bar action" });
		});
		it('should set .store() method as jest mock function', function() {
			expect(result.store.mock).toEqual({ calls: [], instances: [] });
		});
		it('when .store() called with existing store key, it should return the key value', function() {
			expect(result.store('foo')).toEqual('foo store');
		});
	});
});
