'use strict';
jest.dontMock('../../lib/fake-instantiated-flux');
describe('Lib.fakeInstantiatedFlux', function() {
	var fakeStoreInstances,
		fakeInstantiatedFlux;
	beforeEach(function() {
		fakeStoreInstances = require('../../lib/fake-store-instances');
		fakeInstantiatedFlux = require('../../lib/fake-instantiated-flux');
	});
	it('should be a function', function() {
		expect(fakeInstantiatedFlux).toEqual(jasmine.any(Function));
	});
	describe('when passed jest and flux with .stores and .actions properties', function() {
		var flux, result;
		beforeEach(function() {
			flux = { stores: { store: "foo" }, actions: { action: function() {}, prop: "bar" } };
			result = fakeInstantiatedFlux(jest, flux);
		});
		it('should call fakeStoreInstances() with jest and flux.stores', function() {
			expect(fakeStoreInstances).toBeCalledWith(jest, { store: "foo" });
		});
		it('should transform flux.action methods to mock fns', function() {
			expect(flux.actions.action.mock.calls).toEqual([]);
		});
		it('should not change flux.action properties', function() {
			expect(flux.actions.prop).toBe('bar');
		});
		it('should return flux', function() {
			expect(result).toBe(flux);
		});
	});
});
