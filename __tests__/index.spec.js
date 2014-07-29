'use strict';
jest.dontMock('util');
jest.dontMock('../index.js');
describe('Index', function() {
	var fakeDispatchOnActions, fakeFluxInstance, fakeWaitForMethodOnStore, mountReactClassAsChildComponent,
		Fluxxor, Index;
	beforeEach(function() {
		fakeDispatchOnActions = require('../lib/fake-dispatch-on-actions');
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
		it('when .fakeDispatchOnActions() called with actions, it should call .fakeDispatchOnActions() with jest and actions and return result', function() {
			fakeDispatchOnActions.mockReturnValue('faked actions');
			var result = utils.fakeDispatchOnActions('actions');
			expect(fakeDispatchOnActions).toBeCalledWith(jest, 'actions');
			expect(result).toBe('faked actions');
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
