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
      loginDialogService.open.and.returnValue(Promise.resolve('xxx'))

      var widgetCtrl = new WidgetCtrl(loginDialogService)

      widgetCtrl.open()
      .then(function (response) {
        expect(loginDialogService.open).toHaveBeenCalled()
        done()
      })
      .catch(function (err) {
        fail(err.message)
        done()
      })
    })

    describe('dialog box', () => {
      it('opens a dialog box', (done) => {
        var Dialog = require('./dialog')

        var $mdDialog = jasmine.createSpyObj('$mdDialog', ['show'])
        $mdDialog.show.and.returnValue(Promise.resolve(mockCredintials))

        var tokenService = jasmine.createSpyObj('tokenService', ['save'])
        tokenService.save.and.returnValue(Promise.resolve('xxx'))

        var apiService = {
          login: function () {
            return Promise.resolve('xxx')
          }
        }

        var dialog = new Dialog($mdDialog, apiService, tokenService)

        dialog.open()
        .then(function (credintials) {
          expect(tokenService.save).toHaveBeenCalled()
          done()
        })
      })

      it('cancels a dialog box', () => {
        fail()
      })

      it('fails the login', () => {
        fail()
      })
    })

    describe('auth service', () => {
      it('event:auth-loginRequired calls the login and gets a token', (done) => {
        var AuthEventService = require('./auth')

        var dialogService = {
          open: function () {
            return Promise.resolve(null)
          }
        }

        var authService = {
          loginConfirmed: jasmine.createSpy()
        }

        var auth = new AuthEventService(dialogService, authService)

        auth.loginRequired()
        .then(function (response) {
          expect(authService.loginConfirmed).toHaveBeenCalled()
          done()
        })
      })
    })
  })
})
