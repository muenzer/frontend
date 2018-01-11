/* eslint-env jasmine */

describe('profile module', () => {
  describe('routing', () => {
    var routeConfig = require('./profile.routes')

    it('creates a route', () => {
      var $stateProvider = {
        state: jasmine.createSpy()
      }

      routeConfig($stateProvider)
      expect($stateProvider.state).toHaveBeenCalled()
    })
  })
})

describe('profile controller', () => {
  var ProfileCtrl = require('./profile.controller')

  it('provides a function', () => {
    expect(typeof ProfileCtrl).toBe('function')
  })
})
