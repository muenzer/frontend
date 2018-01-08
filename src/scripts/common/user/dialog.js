'use strict'

var LoginDialogController = require('./dialogCtrl')

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
  }
}
