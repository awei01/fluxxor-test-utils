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
# fakeFlux() returns an instance of FakeFlux. 
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

FluxxorTestUtils.extendJasmineMatchers( jasmine )

```
# extendJasmineMatchers() 
# This method extends jasmine matchers with additional methods for testing.
# @param:   (required) The jasmine object (usually "this" when in a test suite)
# @returns: itself to allow for chaining

# from within a test suite:
var FluxxorTestUtils;
beforeEach(function() {
	FluxxorTestUtils = require('fluxxor-test-utils');
	FluxxorTestUtils.extendJasmineMatchers();
	
	// or:
	// FluxxorTestUtils = require('fluxxor-test-utils').extendJasmineMatchers();
});
```

FluxxorTestUtils.getJestUtils()

```
# getJestUtils();
# Returns instance of Jest utility object that helps resolve jest instance if you're using jest-cli to test
# @returns: JestUtils

var FluxxorTestUtils = require('fluxxor-test-utils');
var JestUtils = FluxxorTestUtils.getJestUtils();
```

