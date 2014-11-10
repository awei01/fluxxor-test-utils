'use strict';
var Fluxxor = require('fluxxor'),
	Events = require('./events');

module.exports = Fluxxor.createStore({
	initialize: function() {
		this.bindActions(
			Events.FOO_EVENT, this._handleFooEvent
		);
	},
	_value: undefined,
	_handleFooEvent: function(payload) {
		this._value = payload.value;
		this.emit('foo change');
	},
	getValue: function() {
		return this._value;
	}

});
