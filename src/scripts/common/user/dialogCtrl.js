'use strict'

module.exports = function LoginDialogController ($mdDialog, api, tokenService, $rootScope) {
  var vm = this

  vm.hide = function () {
    $mdDialog.hide()
  }
  vm.close = function () {
    $mdDialog.cancel()
  }
  vm.login = function () {
    var credentials = {user: { email: this.email, password: this.password }}

    return api.users.login(credentials)
    .then(function (token) {
      $rootScope.isAuthenticated = true
      return tokenService.save(token)
    })
    .then(function (token) {
      return $mdDialog.hide(token)
    })
    .catch((err) => {
      this.message = err.data
    })
  }
}
