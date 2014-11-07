'use strict';
var Events = require('./events');

module.exports = {
	doFooAction: function(value) {
		this.dispatch(Events.FOO_EVENT, { value: value });
	}
}
