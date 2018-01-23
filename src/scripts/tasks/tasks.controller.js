'use strict'

module.exports = function TasksController () {
  var $ctrl = this

  $ctrl.setFocus = function (task) {
    $ctrl.focus = $ctrl.tasks.indexOf(task)
  }

  $ctrl.update = function (task, update) {
    update.then((response) => {
      task = Object.assign(task, response)
    })
  }
}
