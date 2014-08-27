'use strict';
jest.dontMock('../../lib/fake-dispatch-on-actions');
describe('Lib.fakeDispatchOnActions', function() {
	var fakeDispatchOnActions;
	beforeEach(function() {
		fakeDispatchOnActions = require('../../lib/fake-dispatch-on-actions');
	});
	it('should be a function', function() {
		expect(fakeDispatchOnActions).toEqual(jasmine.any(Function));
	});
	describe('when passed jest and actions object', function() {
		var actions, result;
		beforeEach(function() {
			actions = {
				foo: "foo value",
				bar: {
					bar1: "bar 1 value",
					bar2: function() {
						this.dispatch('bar.bar2');
					}
				},
				boo: function() {
					this.dispatch('boo');
				}
			};
			result = fakeDispatchOnActions(jest, actions );
		});
		it('should return object', function() {
			expect(result).toEqual(jasmine.any(Object));
		});
		it('should not modify string properties', function() {
			expect(result.foo).toBe('foo value');
		});
		it('should not modify nested string properties', function() {
			expect(result.bar.bar1).toBe('bar 1 value');
		});
		it('should add .dispatch() method as mock function', function() {
			expect(result.dispatch.mock).toEqual({ calls: [], instances: [] });
		});
		it('when method is called, it should properly set "this" context from within the method', function() {
			result.boo();
			expect(result.dispatch).toBeCalledWith('boo');
		});
		it('when nested method is called, it should properly set "this" context from within the nested method', function() {
			result.bar.bar2();
			expect(result.dispatch).toBeCalledWith('bar.bar2');
		});
	});
});
