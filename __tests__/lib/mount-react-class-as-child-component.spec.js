'use strict';
jest.autoMockOff();
describe('Lib.mountReactClassAsChildComponent', function() {
	var React, Fluxxor,
		fakeFluxInstance, mountReactClassAsChildComponent;
	beforeEach(function() {
		React = require('react/addons');
		Fluxxor = require('fluxxor');
		fakeFluxInstance = require('../../lib/fake-flux-instance');
		mountReactClassAsChildComponent = require('../../lib/mount-react-class-as-child-component');
	});
	it('should be a function', function() {
		expect(mountReactClassAsChildComponent).toEqual(jasmine.any(Function));
	});
	describe('when called with React with addons, react class, flux with stores and actions, and props', function() {
		var FooReactClass, stores, actions, flux, result;
		beforeEach(function() {
			FooReactClass = React.createClass({
				mixins: [Fluxxor.FluxChildMixin(React), Fluxxor.StoreWatchMixin('FooStore')],
				getStateFromFlux: function() {
					return {
						fooStoreValue: this.getFlux().store('FooStore').getValue()
					}
				},
				render: function() {
					return React.DOM.div();
				},
				handleAction: function() {
					this.getFlux().actions.doSomething();
				}
			});
			stores = {
				FooStore: {
					getValue: function() {},
					on: function() {}
				}
			};
			actions = { doSomething: jest.genMockFn() };
			flux = fakeFluxInstance(jest, stores, actions);
			result = mountReactClassAsChildComponent(React, FooReactClass, flux, { foo: "bar" });
		});
		it('should return a rendered React component', function() {
			expect(result.getDOMNode().tagName).toBe('DIV');
		});
		it('component .getFlux() should return flux', function() {
			expect(result.getFlux()).toBe(flux);
		});
		it('should set passed props to component', function() {
			expect(result.props.foo).toBe('bar');
		});
		it('component .getStateFromFlux() called, it should set state.fooStoreValue with FooStore.getValue()', function() {
			stores.FooStore.getValue.mockReturnValue('value');
			var state = result.getStateFromFlux();
			expect(state.fooStoreValue).toBe('value');
		});
		it('component .setProps() should set props on component', function() {
			result.setProps({ baz: "boo" });
			expect(result.props.baz).toBe('boo');
		});
		it('component can call flux action', function() {
			result.handleAction();
			expect(actions.doSomething).toBeCalled();
		});
	});
});
