'use strict';
var fakeDispatchOnActions = require('./fake-dispatch-on-actions'),
	fakeFluxOnActions = require('./fake-flux-on-actions');

module.exports = function(jest, actions, flux) {
	fakeDispatchOnActions(jest, actions);
	fakeFluxOnActions(jest, actions, flux);
	return actions;
};
