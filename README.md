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

## FluxxorTestUtils Usage ##

Require `fluxxor-test-utils` in your test file. This will return an object with 3 methods:

* ** fakeFlux([storesOrFluxInstance], [actions]) **: this method mirrors the instantiation of a new `Flux` instance. It will return an instance of `FakeFlux`

* **
