'use strict';
jest.dontMock('../../lib/fake-store-instance');
describe('Lib.fakeStoreInstance', function() {
	var fakeStoreInstance;
	beforeEach(function() {
		fakeStoreInstance = require('../../lib/fake-store-instance');
	});
	it('should be a function', function() {
		expect(fakeStoreInstance).toEqual(jasmine.any(Function));
	});
	describe('when passed jest and an object', function() {
		var store, result;
		beforeEach(function() {
			store = {
				foo: "foo value",
				bar: function() {
				}
			};
			result = fakeStoreInstance(jest, store);
		});
		it('should return an object', function() {
			expect(result).toEqual(jasmine.any(Object));
		});
		it('should ignore non-method properties', function() {
			expect(result.foo).toBe('foo value');
		});
		it('should mock method properties', function() {
			expect(result.bar.mock).toEqual({ calls: [], instances: [] });
		});
	});
	describe('when passed jest and a function', function() {
		var makeStore, result;
		beforeEach(function() {
			makeStore = function() {
				return {
					foo: "foo value",
					bar: function() {
					}
				}
			};
			result = fakeStoreInstance(jest, makeStore);
		});
		it('should return an object', function() {
			expect(result).toEqual(jasmine.any(Object));
		});
		it('should ignore non-method properties', function() {
			expect(result.foo).toBe('foo value');
		});
		it('should mock method properties', function() {
			expect(result.bar.mock).toEqual({ calls: [], instances: [] });
		});
	});
});
