'use strict';
var _fakeDispatchOnActions = require('./fake-dispatch-on-actions'),
	_fakeFluxInstance = require('./fake-flux-instance'),
	_fakeWaitForMethodOnStore = require('./fake-waitfor-method-on-store'),
	_mountReactClassAsChildComponent = require('./mount-react-class-as-child-component');
var _jest;

module.exports = function(jest) {
	_jest = jest;
	return {
		setJest: function(jest) {
			_jest = jest;
		},
		fakeDispatchOnActions: function(actions) {
			return _fakeDispatchOnActions(_jest, actions);
		},
		fakeFluxInstance: function(stores, actions) {
			return _fakeFluxInstance(jest, stores, actions);
		},
		fakeWaitForMethodOnStore: function(store, stores) {
			return _fakeWaitForMethodOnStore(jest, store, stores);
		},
		mountReactClassAsChildComponent: _mountReactClassAsChildComponent,
		fakeFluxMethodOnFluxxor: function(fluxxor) {
			if (!typeof fluxxor.Flux === 'function') {
				throw new Error('Fluxxor should have .Flux() method');
			}
			fluxxor.Flux = jest.genMockFn();
		}
	}
};
