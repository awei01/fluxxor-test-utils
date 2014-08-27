'use strict';
jest.dontMock('util');
jest.dontMock('../index.js');
describe('Index', function() {
	var fakeDispatchOnActions, fakeFluxOnActions, prepareActionsWithFlux,
		fakeInstantiatedFlux, fakeFluxInstance,
		fakeWaitForMethodOnStore,
		mountReactClassAsChildComponent,
		Fluxxor, Index;
	beforeEach(function() {
		fakeDispatchOnActions = require('../lib/fake-dispatch-on-actions');
		fakeFluxOnActions = require('../lib/fake-flux-on-actions');
		prepareActionsWithFlux = require('../lib/prepare-actions-with-flux');
		fakeInstantiatedFlux = require('../lib/fake-instantiated-flux');
		fakeFluxInstance = require('../lib/fake-flux-instance');
		fakeWaitForMethodOnStore = require('../lib/fake-waitfor-method-on-store');
		mountReactClassAsChildComponent = require('../lib/mount-react-class-as-child-component');
		Fluxxor = require('fluxxor');

		Index = require('../index');
	});
	it('should be a function', function() {
		expect(Index).toEqual(jasmine.any(Function));
	});
	it('when called with non-jest param, it should throw error', function() {
		expect(function() {
			Index({});
		}).toThrow('Jest is a required parameter');
	});
	describe('when instantiated with jest', function() {
		var utils;
		beforeEach(function() {
			utils = Index(jest);
		});
		it('when .fakeDispatchOnActions() called with actions, it should call .fakeDispatchOnActions() with jest and actions and return actions', function() {
			fakeDispatchOnActions.mockReturnValue('faked actions');
			var result = utils.fakeDispatchOnActions('actions');
			expect(fakeDispatchOnActions).toBeCalledWith(jest, 'actions');
			expect(result).toBe('faked actions');
		});
		it('when .fakeFluxOnActions() called with actions and flux, it should call .fakeFluxOnActions() with jest, actions and flux and return actions', function() {
			fakeFluxOnActions.mockReturnValue('faked actions');
			var result = utils.fakeFluxOnActions('actions', 'flux');
			expect(fakeFluxOnActions).toBeCalledWith(jest, 'actions', 'flux');
			expect(result).toBe('faked actions');
		});
		it('when .prepareActionsWithFlux() called with actions and flux, it should call .prepareActionsWithFlux() with jest, actions and flux and return actions', function() {
			prepareActionsWithFlux.mockReturnValue('faked actions');
			var result = utils.prepareActionsWithFlux('actions', 'flux');
			expect(prepareActionsWithFlux).toBeCalledWith(jest, 'actions', 'flux');
			expect(result).toBe('faked actions');
		});
		it('when .fakeInstantiatedFlux() called with flux, it should call .fakeInstantiatedFlux() with jest and flux and return flux', function() {
			fakeInstantiatedFlux.mockReturnValue('faked flux');
			var result = utils.fakeInstantiatedFlux('flux');
			expect(fakeInstantiatedFlux).toBeCalledWith(jest, 'flux');
			expect(result).toBe('faked flux');
		});
		it('when .fakeFluxInstance() called with stores and actions, it should call .fakeFluxInstance() with jest, stores and actions and return result', function() {
			fakeFluxInstance.mockReturnValue('faked flux');
			var result = utils.fakeFluxInstance('stores', 'actions');
			expect(fakeFluxInstance).toBeCalledWith(jest, 'stores', 'actions');
			expect(result).toBe('faked flux');
		});
		it('when .fakeWaitForMethodOnStore() called with store and other stores, it should call .fakeWaitForMethodOnStore() with jest, stores and other stores', function() {
			utils.fakeWaitForMethodOnStore('store', 'other stores');
			expect(fakeWaitForMethodOnStore).toBeCalledWith(jest, 'store', 'other stores');
		});
		it('should have .mountReactClassAsChildComponent() as reference to Lib.mountReactClassAsChildComponent module', function() {
			expect(utils.mountReactClassAsChildComponent).toBe(mountReactClassAsChildComponent);
		});
		it('when .fakeFluxMethodOnFluxxor() called with non fluxxor object, it should throw error', function() {
			expect(function() {
				utils.fakeFluxMethodOnFluxxor({});
			}).toThrow('Fluxxor should have .Flux() method');
		});
		it('when .fakeFluxMethodOnFluxxor() called with Fluxxor object, it should set .Flux() as a jest mock function', function() {
			utils.fakeFluxMethodOnFluxxor(Fluxxor);
			expect(Fluxxor.Flux.mock).toEqual({ calls: [], instances: [] });
		});
	});
});
