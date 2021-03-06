'use strict'

var NewTaskDialogController = require('./dialogCtrl')

module.exports = function ($mdDialog) {
  var dialog = {
    clickOutsideToClose: true,
    templateUrl: 'templates/newTaskDialog.html',
    // fullscreen: true,
    controller: NewTaskDialogController,
    controllerAs: 'dialog'
  }

  var service = {
    open: open
  }

  return service

  function open (project) {
    dialog.locals = {project: project}
    return $mdDialog.show(dialog)
  }
}
