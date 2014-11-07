'use strict';
var Fluxxor = require('fluxxor'),
	Events = require('./events');

module.exports = Fluxxor.createStore({
	initialize: function() {
		this.bindActions(
			Events.BAR_EVENT, this.handleBarEvent
		);
	},
	_value: undefined,
	handleBarEvent: function(payload) {
		this._value = payload.value;
		this.emit('bar');
	},
	getValue: function() {
		return this._value;
	}

});
