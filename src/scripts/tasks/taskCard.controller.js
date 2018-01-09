'use strict'

module.exports = function TaskCardController () {
  var $ctrl = this
  console.log($ctrl.task)

  $ctrl.update = function (task) {
    return task.then(function (response) {
      $ctrl.task = response
    })
  }

  $ctrl.$onInit = function () {
    $ctrl.expanded = false
  }
}
