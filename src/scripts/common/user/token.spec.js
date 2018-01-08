/* eslint-env jasmine */
describe('manages tokens', () => {
  var Token = require('./token.js')
  var token
  var $window

  beforeEach(() => {
    $window = {
      localStorage: {
        setItem: jasmine.createSpy(),
        getItem: function () {
          return 'xxx'
        },
        removeItem: function () {
          return null
        }
      }
    }

    token = new Token($window)
  })

  it('saves a token', () => {
    token.save('xxx')
    expect($window.localStorage.setItem).toHaveBeenCalledWith('accessToken', 'xxx')
  })

  it('retrieves a token', () => {
    var tokenResponse = token.retrieve()
    expect(tokenResponse).toBe('xxx')
  })

  it('deletes a token', () => {
    var response = token.remove()
    expect(response).toBeDefined()
  })
})
