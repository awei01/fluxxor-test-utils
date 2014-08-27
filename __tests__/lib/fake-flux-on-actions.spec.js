'use strict';
jest.dontMock('../../lib/fake-flux-on-actions');
describe('Lib.fakeFluxOnActions', function() {
	var fakeInstantiatedFlux,
		fakeFluxOnActions;
	beforeEach(function() {
		fakeInstantiatedFlux = require('../../lib/fake-instantiated-flux');
		fakeFluxOnActions = require('../../lib/fake-flux-on-actions');
	});
	describe('when called with jest, actions and flux', function() {
		var actions, flux, result;
		beforeEach(function() {
			actions = {};
			flux = {};
			fakeInstantiatedFlux.mockReturnValue(flux);
			result = fakeFluxOnActions(jest, actions, flux);
		});
		it('should call fakeInstantiatedFlux() with jest and flux', function() {
			expect(fakeInstantiatedFlux).toBeCalledWith(jest, flux);
		});
		it('should set actions.flux as result of fakeInstantiatedFlux()', function() {
			expect(actions.flux).toBe(flux);
		});
		it('should return actions', function() {
			expect(result).toBe(actions);
		});
	});
});
