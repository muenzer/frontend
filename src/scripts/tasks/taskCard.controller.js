'use strict'

module.exports = function TaskCardController () {
  var $ctrl = this
  console.log($ctrl.task)

  $ctrl.$onInit = function () {
    $ctrl.expanded = false
  }
}
