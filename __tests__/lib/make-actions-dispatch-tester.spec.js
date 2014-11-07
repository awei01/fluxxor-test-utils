'use strict';
jest.dontMock('../../lib/make-actions-dispatch-tester');
describe('Lib.makeActionsDispatchTester()', function() {
	var makeActionsDispatchTester;
	beforeEach(function() {
		makeActionsDispatchTester = require('../../lib/make-actions-dispatch-tester');
	});
	describe('result when called', function() {
		var tester;
		beforeEach(function() {
			tester = makeActionsDispatchTester();
		});
		it('should have .__dispatches__ as []', function() {
			expect(tester.__dispatches__).toEqual([]);
		});
		it('when .dispatch() called with type and payload, should push object with .type and .payload onto .__dispatches__', function() {
			tester.dispatch('foo', 'bar');
			expect(tester.__dispatches__).toEqual([{ type: "foo", payload: "bar" }]);
		});
		it('.toHaveDispatched() called when not dispatched, should return false', function() {
			expect(tester.toHaveDispatched('foo', 'bar')).toBe(false);
		});
		it('when .dispatch() called with type and payload, .toHaveDispatched() should return true for that type and payload', function() {
			tester.dispatch('foo', 'bar');
			expect(tester.toHaveDispatched('foo', 'bar')).toBe(true);
		});
		it('when .dispatch() called with type and payload, .toHaveDispatched() should return false for mismatched type', function() {
			tester.dispatch('foo', 'bar');
			expect(tester.toHaveDispatched('bar', 'bar')).toBe(false);
		});
		it('when .dispatch() called with type and payload, .toHaveDispatched() should return false for mismatched payload', function() {
			tester.dispatch('foo', 'bar');
			expect(tester.toHaveDispatched('foo', 'baz')).toBe(false);
		});
		it('when .dispatch() called with type and payload as object, .toHaveDispatched() should return true for same event and payload', function() {
			tester.dispatch('foo', { bar: "bar value" });
			expect(tester.toHaveDispatched('foo', { bar: "bar value" })).toBe(true);
		});
		it('when .dispatch() called with type and payload, .getLatestDispatch() should return latest dispatch', function() {
			tester.dispatch('foo', 'bar');
			expect(tester.getLatestDispatch()).toEqual({ type: "foo", payload: "bar" });
		});
		it('when .dispatch() called with type and payload and then .resetDispatches() called, .__dispatches__ should be []', function() {
			tester.dispatch('foo', 'bar');
			tester.resetDispatches();
			expect(tester.__dispatches__).toEqual([]);
		});
	});
});
