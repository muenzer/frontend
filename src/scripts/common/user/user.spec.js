/* eslint-env jasmine */
describe('user module', () => {
  var email = 'bob@bob.com'
  var password = 'abc123'

  var mockCredintials = {
    user: {
      email: email,
      password: password
    }
  }

  describe('login', () => {
    it('controls a button', (done) => {
      var WidgetCtrl = require('./widget')

      var loginDialogService = jasmine.createSpyObj('loginDialogService', ['open'])
      var tokenService = jasmine.createSpyObj('tokenService', ['get'])

      loginDialogService.open.and.returnValue(Promise.resolve(mockCredintials))
      tokenService.get.and.returnValue(Promise.resolve('xxx'))

      var widgetCtrl = new WidgetCtrl(loginDialogService, tokenService)

      widgetCtrl.open()
      .then(function (response) {
        expect(loginDialogService.open).toHaveBeenCalled()
        expect(tokenService.get).toHaveBeenCalled()
        done()
      })
      .catch(function (err) {
        fail(err.message)
        done()
      })
    })

    it('opens a dialog box', (done) => {
      var Dialog = require('./dialog')

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

      var $window = {
        localStorage: {
          setItem: jasmine.createSpy()
        }
      }

      var token = new Token(api, $window)

      token.get(credintials)
      .then(function (token) {
        expect(token).toBeDefined()
        expect($window.localStorage.setItem).toHaveBeenCalledWith('accessToken', 'xxx')
        done()
      })
    })
  })
})
