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
			fakeDispatchOnActions.mockReturnValue('faked actions');
			result = prepareActionsWithFlux(jest, actions, flux);
		});
		it('should call fakeDispatchOnActions() with jest and actions', function() {
			expect(fakeDispatchOnActions).toBeCalledWith(jest, actions);
		});
		it('should call fakeFluxOnActions() with jest, result of fakeDispatchOnActions() and flux', function() {
			expect(fakeFluxOnActions).toBeCalledWith(jest, 'faked actions', flux);
		});
		it('should return result of fakeDispatchOnActions()', function() {
			expect(result).toBe('faked actions');
		});
	});
});
