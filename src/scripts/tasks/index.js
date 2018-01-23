'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('tasks', [router.default, api])

var routeConfig = require('./tasks.routes')
app.config(routeConfig)

var TasksController = require('./tasks.controller')

app.component('tasks', {
  templateUrl: 'templates/tasks.html',
  controller: TasksController,
  controllerAs: 'vm',
  bindings: {
    tasks: '<'
  }
})

var TaskCardController = require('./taskCard.controller')
app.component('taskCard', {
  templateUrl: 'templates/taskCard.html',
  controller: TaskCardController,
  controllerAs: 'vm',
  bindings: {
    task: '<',
    setFocus: '&',
    update: '&'
  }
})

module.exports = app.name
