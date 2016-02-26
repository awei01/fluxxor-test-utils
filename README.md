# Fluxxor Test Utils #

This is a repository for facilitating testing when using [Fluxxor](http://http://fluxxor.com). It can be used along with [Jest](http://facebook.github.io/jest/) for testing.

Suggestions and pull requests are welcome.

## Installation ##
`npm install -D fluxxor-test-utils`

## Configuration ##
If you're using jest, you'll want to ensure that this module is not mocked.

### Add the following to the top of every test file that tests fluxxor ###
```
jest.dontMock('fluxxor');
jest.dontMock('fluxxor-test-utils');
```

Or, you can globally configure jest with `unmockedModulePathPatterns` in your `package.json`:
```
{
	"jest": {
		"unmockedModulePathPatterns": [
			"node_modules/fluxxor",
			"node_modules/fluxxor-test-utils"
		]
	}
}
```

## Gotchas! ##

If you're using Jest, according to this issue: https://github.com/facebook/jest/issues/106, you'll have to add `jest.dontMock('util');` at the top of every test in which you want to use `fluxxor` or `fluxxor-test-utils`.

# API #

## FluxxorTestUtils ##

```
# FluxxorTestUtils.fakeFlux( [storesOrFluxInstance], [actions] )
# FakeFlux inherits from Fluxxor.Lib.Flux and has some additional methods to facilitate testing.
# @param:   (optional) Object of stores | instance of Flux
# @param:   (optional) Object of actions
# @returns: FakeFlux instance

var FluxxorTestUtils = require('fluxxor-test-utils');

var fakeFlux = FluxxorTestUtils.fakeFlux();
// returns instance of FakeFlux with empty stores and empty actions
// fakeFlux.stores = {}
// fakeFlux.actions = {}
// you can now add stores or actions on this flux object
// fakeFlux.addStores({ FooStore: new FooStore() }) or fakeFlux.addActions("doFooAction", function() { ... } );

var fakeFlux = FluxxorTestUtils.fakeFlux({ Foo: new FooStore() }, { doFooAction: function() { } });
// returns instance of FakeFlux with stores and actions
// fakeFlux.stores = { Foo: FooStore instance }
// fakeFlux.actions = { doFooAction: function() { } }

var realFlux = new Fluxxor.Flux({ Foo: new FooStore() }, { doFooAction: function() { } });
var fakeFlux = new FluxxorTestUtils.fakeFlux(realFlux);
// returns instance of FakeFlux using the stores and actions defined on a Flux instance
// fakeFlux.stores = { Foo: FooStore instance }
// fakeFlux.actions = { doFooAction: function() { } }


# FluxxorTestUtils.extendJasmineMatchers( jasmine )
# This method extends jasmine matchers with additional methods for testing.
# @param:   (required) The jasmine object (usually "this" when in a test suite)
# @returns: itself to allow for chaining

# from within a test suite:
var FluxxorTestUtils;
describe('some suite', function() {

	beforeEach(function() {
		FluxxorTestUtils = require('fluxxor-test-utils');
		FluxxorTestUtils.extendJasmineMatchers();

		// or:
		// FluxxorTestUtils = require('fluxxor-test-utils').extendJasmineMatchers();
	});
	// now we can use:
	// expect(StoreWatchSpy).toHaveEmitted();
	// expect(StoreWatchSpy).lastEmittedWith('change');
	// expect(ActionsDispatchSpy).lastDispatchedWith('foo event', { value: "foo" });

});


# FluxxorTestUtils.getJestUtils()
# Returns object that helps resolve jest instance if you're using jest-cli to test
# @returns: JestUtils

var FluxxorTestUtils = require('fluxxor-test-utils');
var JestUtils = FluxxorTestUtils.getJestUtils();
```

## FakeFlux ##

```
# fakeFlux.makeStoreEmitSpy( storeName )
# Once the store spied on, all this.emit() calls from within the store are overridden and cannot be restored.
# Returns a StoreEmitSpy
# @param:  (required) valid name of a store
# @returns: StoreEmitSpy

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore() });
var fooSpy = fakeFlux.makeStoreEmitSpy('FooStore');


# fakeFlux.makeActionsDispatchSpy();
# Once the actions dispatch is spied on, all the this.dispatch() calls from within the actions are overridden and cannot be restored.
# Returns an ActionsDispatchSpy
# @returns: ActionsDispatchSpy

var fakeFlux = FluxxorTestUtils.fakeFlux({}, { doFooAction: function() { } });
var actionsSpy = fakeFlux.makeActionsDispatchSpy();
```

### Methods which require Jest ###

The following FakeFlux methods require Jest
```

# fakeFlux.genMocksForStores( storeName, [storeName...])
# When used within Jest tests, creates mocks for each of the store's public methods (not prefixed with '_')
# @param:   one or more names of store, use "*" to mock all stores
# @returns: FakeFlux instance for chaining

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore(), BarStore: new BarStore() });

fakeFlux.genMocksForStores('FooStore');
// now all the FooStore methods are mocked with jest.genMockFn();

fakeFlux.genMocksForStores('FooStore', 'BarStore');
// now both the FooStore and BarStore methods are mocked with jest.genMockFn();

fakeFlux.genMocksForStores('*');
// all of the stores' methods are mocked with jest.genMockFn();


# fakeFlux.genMocksForActions()
# When used within Jest tests, creates mocks for all of the FakeFlux's actions
# @returns: FakeFlux instance for chaining

var fakeFlux = FluxxorTestUtils.fakeFlux({}, { doFooAction: function() { } });

fakeFlux.genMocksForActions();
// now all the actions are mocked with jest.genMockFn();


# fakeFlux.genMocksForStoresAndActions()
# Mocks all the passed stores and actions` methods using jest.genMockFn(); If no stores passed, mocks all stores.
# @params: 	store names
# @returns: FakeFlux instance for chaning

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore() }, { doFooAction: function() { } });

fakeFlux.genMocksForStoresAndActions();
// now all the stores' and actions' methods are mocked with jest.genMockFn();
```

## Spy (StoreEmitSpy and ActionsDispatchSpy inherit from this prototype) ##

```
# Spy.__calls__ "private" reference to array of arguments of captured calls
# Spy.__captureCall "private" method to capture a call

Spy.__captureCall('foo');
Spy.__captureCall('bar', 'baz');


# Spy.getCalls()
# @returns: array of argruments of captured calls

Spy.getCalls()
// returns [['foo'], ['bar', 'baz']];

# Spy.getLastCall()
# @returns: array of parameters for last call

Spy.getLastCall()
// returns ['bar', 'baz'];

# Spy.resetCalls();
# @returns: null

Spy.resetCalls();
// now Spy.__calls__ is an empty array


```

# Examples #

## Unit testing a store ##

```
describe('Testing MyStore', function() {
	var FluxxorTestUtils, fakeFlux, myStore, myStoreSpy;
	beforeEach(function() {
		FluxxorTestUtils = require('fluxxor-test-utils').extendJasmineMatchers(this);
		// now our jasmine matchers are available

		fakeFlux = FluxxorTestUtils.fakeFlux({ MyStore: new require('../my-store')() });
		// now we have a FakeFlux instance that has .stores.MyStore

		myStore = fakeFlux.store('MyStore');
		// easier access to my store instance

		myStoreSpy = fakeFlux.makeStoreEmitSpy('MyStore');
		// now all our this.emit() calls from within the store are captured
	});
	it('when dispatcher dispatches event of "foo event" with payload.value, it should set .getValue() and emit "change" event', function() {
		fakeFlux.dispatcher.dispatch({ type: "foo event", payload: { value: "new value" } });
		expect(myStore.getValue()).toBe('new value');
		expect(myStoreSpy.getLastCall()).toEqual(['change']);
		// because we extended jasmine matchers, we can also do:
		expect(myStoreSpy).lastEmittedWith('change');
	});
});
```

## Unit testing actions ##

```
describe('Testing MyActions', function() {
	var FluxxorTestUtils, fakeFlux, myActionsSpy;
	beforeEach(function() {
		FluxxorTestUtils = require('fluxxor-test-utils').extendJasmineMatchers(this);
		// now our jasmine matchers are available

		fakeFlux = FluxxorTestUtils.fakeFlux({}, require('../my-actions'));
		// now we have a FakeFlux instance that has .actions set

		myActionsSpy = fakeFlux.makeActionsDispatchSpy();
		// now all our this.dispatch() calls from within the actions are captured
	});
	it('when actions.doFoo() called with "foo value", it should dispatch "foo event" and { value: "foo value" }', function() {
		fakeFlux.actions.doFoo('foo value');
		expect(myActionsSpy.getLastCall()).toEqual(['foo event', { value: "foo value" }]);
		// or:
		expect(myActionsSpy).lastDispatchedWith('foo event', { value: "foo value" });
	});
});
```

## Unit testing a react component that uses Flux ##

```
describe('Testing my component', function() {
	var React, TestUtils, FluxxorTestUtils, fakeFlux, MyComponent;
	beforeEach(function() {
		React = require('react/addons');
		TestUtils = React.addons.TestUtils;
		FluxxorTestUtils = require('fluxxor-test-utils');
		fakeFlux = FluxxorTestUtils({ MyStore: new require('../my-store') }, require('../my-actions'));
		fakeFlux.genMocksForStoresAndActions();
		// now all store and action methods are mocked for testing

		MyComponent = require('../my-component');
	});
	it('when mounted, it should call .getFooValue() on my store and set state.foo', function() {
		var store = fakeFlux.stores.MyStore; // easier reference to our store
		var component;

		store.getFooValue.mockReturnValue('value from store');
		component = TestUtils.renderIntoDocument(MyComponent({ flux: fakeFlux });
		expect(store.getFooValue).toBeCalled();
		expect(component.state.foo).toBe('value from store');
	});
	it('when mounted and clicked, should call actions.doFooAction()', function() {
		var component = TestUtils.renderIntoDocument(MyComponent({ flux: fakeFlux });
		TestUtils.Simulate.click(component.getDOMNode());
		expect(fakeFlux.actions.doFooAction).toBeCalled();
	});
});
```
