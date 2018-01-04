/* eslint-env jasmine */
describe('user module', () => {
  var email = 'bob@bob.com'
  var password = 'abc123'

  describe('login', () => {
    it('opens a dialog box', (done) => {
      var Dialog = require('./dialog.js')

      var mockCredintials = {
        user: {
          email: email,
          password: password
        }
      }

      var $mdDialog = jasmine.createSpyObj('$mdDialog', ['show'])
      $mdDialog.show.and.returnValue(Promise.resolve(mockCredintials))
      var dialog = new Dialog($mdDialog)

      dialog.open()
      .then(function (credintials) {
        expect(credintials.user.email).toBe(email)
        expect(credintials.user.password).toBe(password)
        done()
      })
    })

    it('gets a token', (done) => {
      var Token = require('./token.js')

      var mockApiResponse = {
        user: {
          email: email,
          token: 'xxx'
        }
      }

      var credintials = {
        user: {
          email: email,
          password: password
        }
      }

      var api = jasmine.createSpyObj('api', ['login'])
      api.login.and.returnValue(Promise.resolve(mockApiResponse))

      var token = new Token(api)

      token.get(credintials)
      .then(function (token) {
        expect(token).toBeDefined()
        done()
      })
    })
  })
})
