'use strict'

module.exports = function ($mdDialog) {
  var $service = this
  var dialog = {
    clickOutsideToClose: true,
    templateUrl: 'src/login/loginDialog.html',
    fullscreen: true,
    controller: LoginDialogController,
    controllerAs: 'dialog'
  }

  $service.open = function () {
    return $mdDialog.show(dialog)
  }
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
