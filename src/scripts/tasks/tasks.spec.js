/* eslint-env jasmine */

describe('task module', () => {
  describe('routing', () => {
    var routeConfig = require('./tasks.routes')

    it('creates a route', () => {
      var $stateProvider = {
        state: jasmine.createSpy()
      }

      routeConfig($stateProvider)
      expect($stateProvider.state).toHaveBeenCalled()
    })
  })
})
