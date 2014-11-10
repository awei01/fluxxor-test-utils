'use strict';
jest.dontMock('../../lib/spy');
jest.dontMock('../../lib/store-emit-spy');
describe('Lib.StoreEmitSpy', function() {
	var Spy, StoreEmitSpy;
	beforeEach(function() {
		Spy = require('../../lib/spy');
		StoreEmitSpy = require('../../lib/store-emit-spy');
	});
	describe('result when instantiated with store', function() {
		var store, spy;
		beforeEach(function() {
			store = {};
			spy = new StoreEmitSpy(store);
		});
		it('should be an instance of Spy', function() {
			expect(spy instanceof Spy).toBe(true);
		});
		it('when store.emit() called with params, should update .__calls__', function() {
			store.emit('foo', 'bar');
			expect(spy.__calls__).toEqual([ ['foo', 'bar'] ]);
		});
	});
});
