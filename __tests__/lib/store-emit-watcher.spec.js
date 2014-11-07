'use strict';
jest.dontMock('../../lib/store-emit-watcher');
describe('Lib.StoreEmitWatcher', function() {
	var StoreEmitWatcher;
	beforeEach(function() {
		StoreEmitWatcher = require('../../lib/store-emit-watcher');
	});
	describe('result when instantiated with store', function() {
		var store, watcher;
		beforeEach(function() {
			store = {};
			watcher = new StoreEmitWatcher(store);
		});
		it('should have .__emits__ as []', function() {
			expect(watcher.__emits__).toEqual([]);
		});
		it('when store.emit() called, it should add event to .__emits__', function() {
			store.emit('foo');
			expect(watcher.__emits__).toEqual(['foo']);
		});
		it('.caughtEmit() called with event that has not been emitted should return false', function() {
			expect(watcher.caughtEmit('foo')).toBe(false);
		});
		it('when store.emit() called with event, .caughtEmit() should return true for that event', function() {
			store.emit('foo');
			expect(watcher.caughtEmit('foo')).toBe(true);
		});
		it('when store.emit() called with event, .getLast() should return most recent event', function() {
			store.emit('foo');
			expect(watcher.getLast()).toBe('foo');
		});
		it('when .emit() called and then .reset() called, should empty .__emits__ but keep array pointer', function() {
			var emits = watcher.__emits__;
			store.emit('foo');
			watcher.reset();
			expect(watcher.__emits__).toBe(emits);
			expect(watcher.__emits__).toEqual([]);
		});
	});
});
