'use strict';
var _ = require('lodash');

module.exports = function() {
	return {
		__emits__: [],
		emit: function(event) {
			this.__emits__.push(event);
		},
		toHaveEmitted: function(event) {
			return _.indexOf(this.__emits__, event) > -1;
		},
		getLatestEmit: function() {
			var length = this.__emits__.length - 1;
			return this.__emits__[length];
		},
		resetEmits: function() {
			this.__emits__ = [];
		}
	}
};
