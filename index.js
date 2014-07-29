'use strict';
var _fakeDispatchOnActions = require('./lib/fake-dispatch-on-actions'),
	_fakeFluxInstance = require('./lib/fake-flux-instance'),
	_fakeWaitForMethodOnStore = require('./lib/fake-waitfor-method-on-store'),
	_mountReactClassAsChildComponent = require('./lib/mount-react-class-as-child-component');

module.exports = function(jest) {
	if (!jest || typeof jest.mock !== 'function') {
		throw new Error('Jest is a required parameter');
	}
	return {
		fakeDispatchOnActions: function(actions) {
			return _fakeDispatchOnActions(jest, actions);
		},
		fakeFluxInstance: function(stores, actions) {
			return _fakeFluxInstance(jest, stores, actions);
		},
		fakeWaitForMethodOnStore: function(store, stores) {
			_fakeWaitForMethodOnStore(jest, store, stores);
		},
		mountReactClassAsChildComponent: _mountReactClassAsChildComponent,
		fakeFluxMethodOnFluxxor: function(fluxxor) {
			if (typeof fluxxor.Flux !== 'function') {
				throw new Error('Fluxxor should have .Flux() method');
			}
			fluxxor.Flux = jest.genMockFn();
		}
	}
};
