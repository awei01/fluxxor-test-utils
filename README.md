# Fluxxor Test Utils #

This is a repository for facilitating testing when using [Fluxxor](http://http://fluxxor.com). It can be used along with [Jest](http://facebook.github.io/jest/) for testing.

** This is a work in progress and API is not stable. ** Suggestions and pull requests are welcome.

## Installation ##
`npm install -D fluxxor-test-utils`

## Configuration ##
If you're using jest, you'll want to ensure that this module is not mocked.

Add the following to the top of every test file that tests fluxxor:
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
			"node_modules/fluxxor-jest-utils"
		]
	}
}
```

## Gotchas! ##

If you're using Jest, according to this issue: https://github.com/facebook/jest/issues/106, you'll have to add `jest.dontMock('util');` at the top of every test in which you want to use `fluxxor` or `fluxxor-test-utils`.

# API #

## FluxxorTestUtils ##

FluxxorTestUtils.fakeFlux( [storesOrFluxInstance], [actions] )

```
# FakeFlux inherits from Fluxxor.Lib.Flux and has some additionaly methods to facilitate testing.
# @param:   (optional) Object of stores | instance of Flux 
# @param:   (optional) Object of actions
# @returns: FakeFlux instance

var FluxxorTestUtils = require('fluxxor-test-utils');

var fakeFlux = FluxxorTestUtils.fakeFlux(); 
// returns instance of FakeFlux with empty stores and empty actions
// fakeFlux.stores = {}
// fakeFlux.actions = {}

var fakeFlux = FluxxorTestUtils.fakeFlux({ Foo: new FooStore() }, { doFooAction: function() { } });
// returns instance of FakeFlux with stores and actions
// fakeFlux.stores = { Foo: FooStore instance }
// fakeFlux.actions = { doFooAction: function() { } }

var realFlux = new Fluxxor.Flux({ Foo: new FooStore() }, { doFooAction: function() { } });
var fakeFlux = new FluxxorTestUtils.fakeFlux(realFlux);
// returns instance of FakeFlux using the stores and actions defined on a Flux instance
// fakeFlux.stores = { Foo: FooStore instance }
// fakeFlux.actions = { doFooAction: function() { } }

```


## FakeFlux ##

fakeFlux.makeStoreEmitSpy( storeName )


```
# Returns a StoreEmitSpy
# @param:  (required) valid name of a store
# @returns: StoreEmitSpy

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore() });
var fooSpy = fakeFlux.makeStoreEmitSpy('FooStore');
```

fakeFlux.makeActionsDispatchSpy();

``` 
# Returns an ActionsDispatchSpy
# @returns: ActionsDispatchSpy

var fakeFlux = FluxxorTestUtils.fakeFlux({}, { doFooAction: function() { } });
var actionsSpy = fakeFlux.makeActionsDispatchSpy();
```

fakeFlux.genMocksForStore( storeName, [storeName...])

```
# When used within Jest tests, creates mocks for each of the store's public methods (not prefixed with '_')
# @param:   one or more names of store, use "*" to mock all stores
# @returns: FakeFlux instance for chaining

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore(), BarStore: new BarStore() });

fakeFlux.genMocksForStore('FooStore');
// now all the FooStore methods are mocked with jest.genMockFn();

fakeFlux.genMocksForStore('FooStore', 'BarStore');
// now both the FooStore and BarStore methods are mocked with jest.genMockFn();

fakeFlux.genMocksForStore('*');
// all of the stores' methods are mocked with jest.genMockFn();
```

fakeFlux.genMocksForActions()

```
# When used within Jest tests, creates mocks for all of the FakeFlux's actions
# @returns: FakeFlux instance for chaining

var fakeFlux = FluxxorTestUtils.fakeFlux({}, { doFooAction: function() { } });

fakeFlux.genMocksForActions();
// now all the actions are mocked with jest.genMockFn();
```

fakeFlux.genMocksForStoresAndActions()
```
# Mocks all the stores' and actions` methods using jest.genMockFn();
# @returns: FakeFlux instance for chaning

var fakeFlux = FluxxorTestUtils.fakeFlux({ FooStore: new FooStore() }, { doFooAction: function() { } });

fakeFlux.genMocksForStoresAndActions();
// now all the stores' and actions' methods are mocked with jest.genMockFn();
```
