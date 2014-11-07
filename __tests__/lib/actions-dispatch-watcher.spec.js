'use strict';
jest.dontMock('../../lib/actions-dispatch-watcher');
describe('Lib.ActionsDispatchWatcher', function() {
	var ActionsDispatchWatcher;
	beforeEach(function() {
		ActionsDispatchWatcher = require('../../lib/actions-dispatch-watcher');
	});
	describe('result when instantiated', function() {
		var binder, watcher;
		beforeEach(function() {
			binder = {};
			watcher = new ActionsDispatchWatcher(binder);
		});
		it('should have .__dispatches__ as []', function() {
			expect(watcher.__dispatches__).toEqual([]);
		});
		it('when .dispatch() called with type and payload, should push object with .type and .payload onto .__dispatches__', function() {
			binder.dispatch('foo', 'bar');
			expect(watcher.__dispatches__).toEqual([{ type: "foo", payload: "bar" }]);
		});
		it('.caughtDispatch() called when not dispatched, should return false', function() {
			expect(watcher.caughtDispatch('foo', 'bar')).toBe(false);
		});
		it('when .dispatch() called with type and payload, .caughtDispatch() should return true for that type and payload', function() {
			binder.dispatch('foo', 'bar');
			expect(watcher.caughtDispatch('foo', 'bar')).toBe(true);
		});
		it('when .dispatch() called with type and payload, .getLast() should return latest dispatch', function() {
			binder.dispatch('foo', 'bar');
			expect(watcher.getLast()).toEqual({ type: "foo", payload: "bar" });
		});
		it('when .dispatch() called with type and payload and then .reset() called, should empty .__dispatches__ but keep array pointer', function() {
			var dispatches = watcher.__dispatches__;
			binder.dispatch('foo', 'bar');
			watcher.reset();
			expect(watcher.__dispatches__).toBe(dispatches);
			expect(watcher.__dispatches__).toEqual([]);
		});
	});
});
