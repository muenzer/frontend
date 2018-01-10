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
