'use strict';
jest.dontMock('../../lib/jest-utils');
describe('Lib.JestUtils', function() {
	var JestUtils;
	beforeEach(function() {
		JestUtils = require('../../lib/jest-utils');
	});
	it('should be an object', function() {
		expect(JestUtils).toEqual(jasmine.any(Object));
	});
	describe('.setJest()', function() {
		it('when called with jest, should set result of .getJest()', function() {
			JestUtils.setJest(jest);
			expect(JestUtils.getJest()).toBe(jest);
		});
		it('when called with invalid jest, should throw error', function() {
			expect(function() {
				JestUtils.setJest({});
			}).toThrow('Invalid jest');
		});
	});
	describe('.mockObjectWithJest()', function() {
		it('when .setJest() not called, should use global jest', function() {
			var object = { someMethod: function() { } };
			JestUtils.mockObjectWithJest(object);
			expect(object.someMethod.mock.calls).toEqual([]);
		});
		it('when .setJest() set with jest, should use that instance', function() {
			var fakeJest = { genMockFn: function() { return "mocked"; } },
				object = { someMethod: function() { } };
			JestUtils.setJest(fakeJest);
			JestUtils.mockObjectWithJest(object);
			expect(object.someMethod).toBe('mocked');
		});
	});
});
