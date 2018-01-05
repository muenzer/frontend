'use strict'

var WidgetCtrl = function (loginDialogService, tokenService) {
  var vm = this

  vm.open = function () {
    return loginDialogService.open()
      .then(function (credintials) {
        return tokenService.get(credintials)
      })
  }
}
module.exports = WidgetCtrl
