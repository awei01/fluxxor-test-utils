'use strict';
jest.dontMock('../../lib/make-store-emit-tester');
describe('Lib.makeStoreEmitTester()', function() {
	var makeStoreEmitTester;
	beforeEach(function() {
		makeStoreEmitTester = require('../../lib/make-store-emit-tester');
	});
	describe('result when called', function() {
		var tester;
		beforeEach(function() {
			tester = makeStoreEmitTester();
		});
		it('should have .__emits__ as []', function() {
			expect(tester.__emits__).toEqual([]);
		});
		it('when .emit() called, it should add event to .__emits__', function() {
			tester.emit('foo');
			expect(tester.__emits__).toEqual(['foo']);
		});
		it('.toHaveEmitted() called with event that has not been emitted should return false', function() {
			expect(tester.toHaveEmitted('foo')).toBe(false);
		});
		it('when .emit() called with event, .toHaveEmitted() should return true for that event', function() {
			tester.emit('foo');
			expect(tester.toHaveEmitted('foo')).toBe(true);
		});
		it('when .emit() called with event, .getLatestEmit() should return most recent event', function() {
			tester.emit('foo');
			expect(tester.getLatestEmit()).toBe('foo');
		});
		it('when .emit() called and then .resetEmits() called, should set .__emits__ to []', function() {
			tester.emit('foo');
			tester.resetEmits();
			expect(tester.__emits__).toEqual([]);
		});
	});
});
