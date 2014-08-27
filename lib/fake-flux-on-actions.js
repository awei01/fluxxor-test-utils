'use strict';
var fakeInstantiatedFlux = require('./fake-instantiated-flux');
module.exports = function(jest, actions, flux) {
	actions.flux = fakeInstantiatedFlux(jest, flux);
	return actions;
};
