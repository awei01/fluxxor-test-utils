'use strict';
jest.dontMock('../../lib/prepare-actions-with-flux');
describe('Lib.prepareActionsWithFlux', function() {
	var fakeDispatchOnActions,
		fakeFluxOnActions,
		prepareActionsWithFlux;
	beforeEach(function() {
		fakeDispatchOnActions = require('../../lib/fake-dispatch-on-actions');
		fakeFluxOnActions = require('../../lib/fake-flux-on-actions');
		prepareActionsWithFlux = require('../../lib/prepare-actions-with-flux');
	});
	describe('when called with jest, actions and flux', function() {
		var actions, flux, result;
		beforeEach(function() {
			actions = {};
			flux = {};
			result = prepareActionsWithFlux(jest, actions, flux);
		});
		it('should call fakeDispatchOnActions() with jest and actions', function() {
			expect(fakeDispatchOnActions).toBeCalledWith(jest, actions);
		});
		it('should call fakeFluxOnActions() with jest, actions and flux', function() {
			expect(fakeFluxOnActions).toBeCalledWith(jest, actions, flux);
		});
		it('should return actions', function() {
			expect(result).toBe(actions);
		});
	});
});
