'use strict'

module.exports = function (loginDialogService, authService) {
  var service = {
    loginRequired: loginRequired
  }

  return service

  function loginRequired () {
    return loginDialogService.open()
    .then(function () {
      return authService.loginConfirmed()
    })
  }
}
