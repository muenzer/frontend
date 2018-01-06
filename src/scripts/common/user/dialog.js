'use strict'

module.exports = function ($mdDialog, api, tokenService) {
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
    .then(function (credentials) {
      return api.login(credentials)
    })
    .then(function (token) {
      return tokenService.save(token)
    })
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
