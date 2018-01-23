'use strict'

module.exports = function TaskCardController () {
  var $ctrl = this
  console.log($ctrl.task)

  // $ctrl.update = function (task) {
  //   return task.then(function (response) {
  //     $ctrl.task = response
  //   })
  // }

  $ctrl.expand = function (state) {
    $ctrl.expanded = state
    if ($ctrl.expanded) {
      $ctrl.setFocus({'task': $ctrl.task})
    } else {
      $ctrl.setFocus({'task': null})
    }
  }

  $ctrl.$onInit = function () {
    $ctrl.expanded = false
  }
}
