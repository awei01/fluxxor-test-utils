'use strict';
jest.dontMock('../../lib/spy.js');
describe('Lib.Spy', function() {
	var Spy;
	beforeEach(function() {
		Spy = require('../../lib/spy.js');
	});
	describe('result when instantiated', function() {
		var spy;
		beforeEach(function() {
			spy = new Spy();
		});
		it('should have .__calls__ property as []', function() {
			expect(spy.__calls__).toEqual([]);
		});
		it('.__captureCall() called with args, should update .__calls__', function() {
			spy.__captureCall('foo', 'bar');
			expect(spy.__calls__).toEqual([ ['foo', 'bar'] ]);
		});
		it('.getCalls() should return .__calls__', function() {
			expect(spy.getCalls()).toBe(spy.__calls__);
		});
		it('when call captured, .getLastCall() should return latest set of arguments', function() {
			spy.__captureCall('foo', 'bar');
			expect(spy.getLastCall()).toEqual(['foo', 'bar']);
		});
		it('when call captured, .resetCalls() should empty the .__calls__, but keep same pointer reference', function() {
			spy.__captureCall('foo', 'bar');
			var calls = spy.__calls__;
			spy.resetCalls();
			expect(spy.__calls__).toBe(calls);
			expect(spy.__calls__).toEqual([]);
		});
	});
});
