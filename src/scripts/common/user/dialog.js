'use strict'

module.exports = function ($mdDialog) {
  var dialog = {
    clickOutsideToClose: true,
    templateUrl: 'templates/loginDialog.html',
    fullscreen: true,
    controller: LoginDialogController,
    controllerAs: 'dialog'
  }

  var service = {
    open: open
  }

  return service

  function open () {
    return $mdDialog.show(dialog)
  }

  function LoginDialogController ($mdDialog) {
    var $ctrl = this

    $ctrl.hide = function () {
      $mdDialog.hide()
    }
    $ctrl.close = function () {
      $mdDialog.cancel()
    }
    $ctrl.login = function () {
      $mdDialog.hide({user: { email: this.email, password: this.password }})
    }
  }
}
