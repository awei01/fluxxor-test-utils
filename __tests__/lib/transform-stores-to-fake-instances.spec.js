'use strict';
jest.dontMock('../../lib/transform-stores-to-fake-instances.js');
describe('Lib.transformStoreToFakeInstances', function() {
	var fakeStoreInstance,
		transformStoreToFakeInstances;
	beforeEach(function() {
		fakeStoreInstance = require('../../lib/fake-store-instance');
		transformStoreToFakeInstances = require('../../lib/transform-stores-to-fake-instances');
	});
	it('should be a function', function() {
		expect(transformStoreToFakeInstances).toEqual(jasmine.any(Function));
	});
	describe('when passed jest and an object of stores', function() {
		var stores, result;
		beforeEach(function() {
			fakeStoreInstance.mockImpl(function(jest, input) {
				return 'faked ' + input;
			});
			stores = {
				FooStore: "foo store",
				BarStore: "bar store"
			};
			result = transformStoreToFakeInstances(jest, stores);
		});
		it('should call .fakeStoreInstance() with the first store', function() {
			expect(fakeStoreInstance).toBeCalledWith(jest, 'foo store');
		});
		it('should call .fakeStoreInstance() with jest and the second store', function() {
			expect(fakeStoreInstance).toBeCalledWith(jest, 'bar store');
		});
		it('should return an object with the faked stores', function() {
			expect(result).toEqual({ FooStore: "faked foo store", BarStore: "faked bar store" });
		});
	});
});
