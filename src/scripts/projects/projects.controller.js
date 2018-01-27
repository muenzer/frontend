'use strict'

module.exports = function ProjectsController (newTaskDialogService) {
  var $ctrl = this

  $ctrl.dialog = newTaskDialogService
}
