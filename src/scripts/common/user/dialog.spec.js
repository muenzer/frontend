/* eslint-env jasmine */

describe('dialog box', () => {
  var $mdDialog

  it('opens a dialog box', () => {
    $mdDialog = jasmine.createSpyObj('$mdDialog', ['show', 'hide'])

    var Dialog = require('./dialog')

    var dialog = new Dialog($mdDialog)

    dialog.open()

    expect($mdDialog.show).toHaveBeenCalled()
  })

  describe('dialog box ctrl', () => {
    beforeEach(() => {
      $mdDialog = jasmine.createSpyObj('$mdDialog', ['show', 'hide', 'cancel'])
    })
    var DialogCtrl = require('./dialogCtrl')

    var tokenService = jasmine.createSpyObj('tokenService', ['save'])
    tokenService.save.and.returnValue(Promise.resolve('xxx'))

    it('submits a dialog box', (done) => {
      var apiService = {
        users: {
          login: function () {
            return Promise.resolve('xxx')
          }
        }
      }

      var dialogCtrl = new DialogCtrl($mdDialog, apiService, tokenService)

      dialogCtrl.login()
      .then(function () {
        expect($mdDialog.hide).toHaveBeenCalled()
        done()
      })
    })

    it('cancels a dialog box', () => {
      var dialogCtrl = new DialogCtrl($mdDialog, null, null)

      dialogCtrl.hide()
      expect($mdDialog.hide).toHaveBeenCalled()
    })

    it('fails the login', (done) => {
      var apiService = {
        users: {
          login: function () {
            return Promise.reject({
              data: 'The credentials provided were invalid.'
            })
          }
        }
      }

      var dialogCtrl = new DialogCtrl($mdDialog, apiService, tokenService)

      dialogCtrl.login()
      .then(function () {
        expect($mdDialog.hide.calls.count()).toBe(0)
        done()
      })
      .catch(function () {
        fail()
        done()
      })
    })
  })
})
