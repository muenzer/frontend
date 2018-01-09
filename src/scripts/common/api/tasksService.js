'use strict'

module.exports = TasksService

var httpService
var root

function TasksService ($http, apiroot) {
  httpService = $http
  this._$http = $http
  root = apiroot
}

TasksService.prototype.getList = function () {
  return httpService.get(root + '/tasks')
  .then(function (response) {
    var tasks = response.tasks

    for (var i = 0, len = tasks.length; i < len; i++) {
      tasks[i] = new Task(tasks[i])
    }

    return tasks
  })
}

TasksService.prototype.get = function (id) {
  return httpService.get(root + '/tasks/' + id)
  .then(function (response) {
    return new Task(response.task)
  })
}

function Task (response) {
  var task = this
  Object.keys(response).forEach(function (key) {
    task[key] = response[key]
  })
}

Task.prototype.work = function () {

}

Task.prototype.cancel = function () {

}

Task.prototype.submit = function () {

}
