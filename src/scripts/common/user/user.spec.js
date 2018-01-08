/* eslint-env jasmine */
describe('user module', () => {
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
