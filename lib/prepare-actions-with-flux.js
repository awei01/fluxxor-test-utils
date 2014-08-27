'use strict';
var fakeDispatchOnActions = require('./fake-dispatch-on-actions'),
	fakeFluxOnActions = require('./fake-flux-on-actions');

module.exports = function(jest, actions, flux) {
	var result = fakeDispatchOnActions(jest, actions);
	fakeFluxOnActions(jest, result, flux);
	return result;
};
