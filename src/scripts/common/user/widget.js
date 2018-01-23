'use strict'

var WidgetCtrl = function (loginDialogService, tokenService, $rootScope, $state) {
  var vm = this

  vm.$onInit = function () {
    if (tokenService.retrieve()) {
      $rootScope.isAuthenticated = true
    }
  }

  vm.open = function () {
    return loginDialogService.open()
  }

  vm.logout = function () {
    tokenService.remove()
    $rootScope.isAuthenticated = false
    $state.go('tasks')
  }
}
module.exports = WidgetCtrl
