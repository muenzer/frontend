/* eslint-env jasmine */
describe('interceptor that sets the auth header', () => {
  var InterceptorProvider = require('./interceptorProvider')

  it('sets a header when there is a token', () => {
    var tokenService = {
      retrieve: function () {
        return 'xxx'
      }
    }

    var interceptor = new InterceptorProvider().$get(tokenService)

    var config = {}

    var newConfig = interceptor.request(config)

    expect(newConfig.headers['Authorization']).toBe('Bearer xxx')
  })

  it('does not set a header when there is no token', () => {
    var tokenService = {
      retrieve: function () {
        return null
      }
    }

    var interceptor = new InterceptorProvider().$get(tokenService)

    var config = {}

    var newConfig = interceptor.request(config)

    expect(newConfig.headers).not.toBeDefined()
  })

  it('does not set a header when a html file is retrieved', () => {
    var tokenService = {
      retrieve: function () {
        return 'xxx'
      }
    }

    var interceptor = new InterceptorProvider().$get(tokenService)

    var config = {
      url: 'template.html'
    }

    var newConfig = interceptor.request(config)

    expect(newConfig.headers).not.toBeDefined()
  })
})
