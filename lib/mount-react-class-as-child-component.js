'use strict';
var _ = require('lodash');

function makeSpecs(React) {
	return {
		childContextTypes: {
			flux: React.PropTypes.object
		},
		getChildContext: function() {
			return {
				flux: this.props.flux
			};
		},
		render: function() {
			var _component = this.props._testComponent,
				transferred = _.omit(this.props, ['flux', '_testComponent']);
			return _component(transferred);
		}
	};
};

module.exports = function(React, component, flux, props) {
	var specs = makeSpecs(React),
		Parent = React.createClass(specs),
		initProps = _.assign({}, props, { flux: flux, _testComponent: component }),
		parent = React.addons.TestUtils.renderIntoDocument(Parent(initProps)),
		result = parent._renderedComponent;
	// overriding set props in order to override Invariant violation error
	result.setProps = function(props) {
		parent.setProps(props);
	};

	return result;
};
