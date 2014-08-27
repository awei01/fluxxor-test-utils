'use strict';
jest.dontMock('../../lib/fake-store-instances');
describe('Lib.fakeStoreInstances', function() {
	var fakeStoreInstance,
		fakeStoreInstances;
	beforeEach(function() {
		fakeStoreInstance = require('../../lib/fake-store-instance');
		fakeStoreInstances = require('../../lib/fake-store-instances');
	});
	it('should be a function', function() {
		expect(fakeStoreInstances).toEqual(jasmine.any(Function));
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
			result = fakeStoreInstances(jest, stores);
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
