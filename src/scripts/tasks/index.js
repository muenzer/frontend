'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('tasks', [router.default, api])

var routeConfig = require('./tasks.routes')
app.config(routeConfig)

app.controller('TasksController', function (tasks) {
  var $ctrl = this
  $ctrl.tasks = tasks
})

var TaskCardController = require('./taskCard.controller')
app.component('taskCard', {
  templateUrl: 'templates/taskCard.html',
  controller: TaskCardController,
  controllerAs: 'vm',
  bindings: {
    task: '<'
  }
})

module.exports = app.name
