'use strict'

var WidgetCtrl = function (loginDialogService) {
  var vm = this

  vm.open = function () {
    return loginDialogService.open()
  }
}
module.exports = WidgetCtrl
