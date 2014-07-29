# Fluxxor Jest Utils #

This is a repository for facilitating testing when using [Fluxxor](https://github.com/BinaryMuse/fluxxor) and [Jest](http://facebook.github.io/jest/docs).

This package assumes that you're using Fluxxor and want to create Jest tests.

## Installation ##
1. Install: `npm install -D fluxxor-jest-utils`
1. Ensure that this package is not mocked when running Jest tests, use `jest.dontMock('fluxxor-jest-utils');` in each test or configure your `package.json` to always ignore the module:
```
{
	jest: {
		unmockedModulePathPatterns: [
			"node_modules/fluxxor-jest-utils"
		]
	}
}
```

## Caveat ##

If you run into `Object [object Object] has no method 'inherits'` error message in your test, you'll need a `jest.dontMock('util');` at the top of your test script. This is possibly related to https://github.com/facebook/jest/issues/78.

## Use Cases ##
**All examples are untested but should give you an idea of how to use this module.**

### Mocking Fluxxor Actions ###
If you want to mock actions, to test that the `.dispatch()` method is called with the correct event and payload, you can do something like:
```
jest.dontMock('./my-actions');
describe('My actions', function() {
	var FluxxorJestUtils, myActions;
	beforeEach(function() {
		FluxxorJestUtils = require('fluxxor-jest-utils')(jest);
		myActions = FluxxorJestUtils.fakeDispatchOnActions(require('./my-actions'));
	});
	it('when myActions.doSomething() is called with parameter, it should call .dispatch() with "something" event and payload with .foo as parameter', function() {
		myActions.doSomething('foo value');
		expect(myActions.dispatch).toBeCalledWith('something', { foo: "foo value" });
	});
});
```

### Mocking a Simple Fluxxor Storage ###

If you're mocking a simple storage that doesn't use the `.waitFor()` method, you don't need to use FluxxorJestUtils. You can do something like this:
```
jest.dontMock('./simple-store');
describe('Simple store', function() {
	var SimpleStore, instance;
	beforeEach(function() {
		SimpleStore = require('./simple-store');
		instance = new SimpleStore();
	});
	it('when "update" event is called with payload with .value property, it should set result of .getValue()', function() {
		instance.__handleAction__({ type: "update", payload: { value: "new value" } });
		expect(instance.getValue()).toBe('new value');
	});
});
```

### Mocking a Fluxxor Storage That Uses .waitFor() ###

If you're mocking a storage that implements the `.waitFor()` method, you can use `FluxxorJestUtils.fakeWaitForMethodOnStore()` like this:
```
jest.dontMock('./waitedon-store');
jest.dontMock('./waitfor-store');
describe('Store that uses .waitFor()', functoin() {
	var WaitedOnStore, WaitForStore, instance, otherStores;
	beforeEach(function() {
		WaitedOnStore = require('./waitedon-store');
		WaitForStore = require('./waitfor-store');
		instance = new WaitForStore();
		otherStores = {
			OtherStore: WaitedOnStore
		};
		FluxxorJestUtils.fakeWaitForMethodOnStore(instance, otherStores);
	});
	it('when "do-many-things" event triggered, it should call OtherStore.getValue() and set .getOtherStoreValue() with the result', function() {
		otherStores.OtherStore.getValue.mockReturnValue('foo');
		instance.__handleAction__({ type: "do-many-things" });
		expect(otherStores.OtherStore.getValue).toBeCalled();
		expect(instsance.getOtherStoreValue()).toBe('foo');
	});
});
```

## Mocking React Classes ##

If you're creating React classes that use Fluxxor, you can mock the Flux instance with stores and actions in order to pass it to the  the component's props.

### React Class That Uses Fluxxor.StoreWatchMixin as a Parent element ###
This React class uses the `Fluxxor.FluxMixin` and `Fluxxor.StoreWatchMixin` mixins.

```
jest.dontMock('./my-store');
jest.dontMock('./my-component');
describe('My Component that uses StoreWatchMixin', function() {
	var TestUtils, FluxxorJestUtils,
		MyStore, MyComponent, stores, flux;
	beforeEach(function() {
		TestUtils = require('react/addons').addons.TestUtils;
		FluxxorJestUtils = require('fluxxor-jest-utils');
		MyStore = require('./my-store');
		MyComponent = require('./my-component');
		stores = {
			Store: MyStore
		};
		flux = FluxxorJestUtils.fakeFluxInstance(stores);
	});
	it('when rendered into document, it should call Store.getState() and set component state.foo with its result', function() {
		stores.Store.getState.mockReturnValue('store value');
		var rendered = TestUtils.renderIntoDocument(MyComponent({ flux: flux }));
		expect(stores.Store.getState).toBeCalled();
		expect(rendered.state.foo).toBe('store value');
	});
});
```

### React Class That Uses flux.actions ###
```
jest.dontMock('./my-component');
describe('My Component that uses flux actions', function() {
	var TestUtils, FluxxorJestUtils,
		MyComponent, actions, flux, rendered;
	beforeEach(function() {
		TestUtils = require('react/addons').addons.TestUtils;
		FluxxorJestUtils = require('fluxxor-jest-utils');
		MyComponent = require('./my-component');
		actions = require('./my-actions');
		flux = FluxxorJestUtils.fakeFluxInstance({}, actions});
		rendered = TestUtils.renderIntoDocument(MyComponent({ flux: flux }));
	});
	it('when clicked, it should call actions.doSomething() with "foo"', function() {
		TestUtils.Simulate.click(rendered.getDOMNode());
		expect(actions.doSomething).toBeCalledWith('foo');
	});
});
```

### React Class That Uses Fluxxor.StoreWatchMixin as a Child Component ###
This React class uses `Fluxxor.FluxChildMixin` and `Fluxxor.StoreWatchMixin`. It also accesses flux.actions. The `.mountReactClassAsChildComponent()` method allows you to mount the component under test as if it were a child component. It also modifies the rendered components `.setProps()` method to allow you to set props in your tests (even though it would normally throw an exception because it is a child component).
```
jest.dontMock('./my-store');
jest.dontMock('./my-component');
describe('My Component that uses stores as a child and also calls flux.actions', function() {
	var TestUtils, FluxxorJestUtils,
		MyComponent, MyStore, stores, actions, flux;
	beforeEach(function() {
		TestUtils = require('react/addons').addons.TestUtils;
		FluxxorJestUtils = require('fluxxor-jest-utils');
		MyComponent = require('./my-component');
		MyStore = require('./my-store');
		actions = require('./my-actions');
		stores = {
			Store: MyStore,
		};
		flux = FluxxorJestUtils.fakeFluxInstance(stores, actions);
	});
	describe('when rendered into document as a child component', function() {
		var rendered, initialProps;
		beforeEach(function() {
			initialProps = { foo: "bar" };
			stores.Store.getValue.mockReturnValue('foo');
			rendered = FluxxorJestUtils.mountReactClassAsChildComponent(React, MyComponent, flux, initialProps);
		});
		it('should call Store.getValue() and set state.fromStore as its result', function() {
			expect(stores.Store.getValue).toBeCalled();
			expect(rendered.state.fromStore).toBe('foo');
		});
		it('should set the rendered component .className as initial props.foo value', function() {
			expect(rendered._renderedComponent.props.className).toBe('bar');
		});
		it('when passed props.foo as "baz", it should set the rendered component .className as "baz"', function() {
			rendered.setProps({ foo: "baz" });
			expect(rendered._renderedComponent.props.className).toBe('baz');
		});
		it('when clicked, it should call actions.doSomething()', function() {
			TestUtils.Simulate.click(rendered.getDOMNode());
			expect(actions.doSomething).toBeCalled();
		});
	});
});
```
