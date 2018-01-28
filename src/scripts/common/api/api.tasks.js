'use strict'

module.exports = TasksService

var joinUrlElements = require('./join')

var httpService
var root

function TasksService ($http, apiroot) {
  httpService = $http
  root = apiroot
}

function catchError (err) {
  console.log(err.message)
  return Promise.resolve(null)
}

TasksService.prototype.create = function (data) {
  return httpService.post(joinUrlElements(root, 'tasks'), data)
  .then((response) => {
    return new Task(response)
  })
  .catch(catchError)
}

TasksService.prototype.getList = function () {
  return httpService.get(joinUrlElements(root, 'tasks'))
  .then(function (response) {
    var tasks = response.data.tasks

    for (var i = 0, len = tasks.length; i < len; i++) {
      tasks[i] = new Task(tasks[i])
    }

    return tasks
  })
  .catch(catchError)
}

TasksService.prototype.get = function (id) {
  return httpService.get(joinUrlElements(root, 'tasks', id))
  .then(function (response) {
    return new Task(response.data.task)
  })
  .catch(catchError)
}

TasksService.prototype.userTasks = function () {
  return httpService.get(joinUrlElements(root, 'users', 'tasks'))
  .then(function (response) {
    var tasks = response.data.tasks

    for (var i = 0, len = tasks.length; i < len; i++) {
      tasks[i] = new Task(tasks[i])
    }

    return tasks
  })
  .catch(catchError)
}

TasksService.prototype.projectTasks = function () {
  return httpService.get(joinUrlElements(root, 'users', 'projects'))
  .then(function (response) {
    var tasks = response.data.tasks

    for (var i = 0, len = tasks.length; i < len; i++) {
      tasks[i] = new Task(tasks[i])
    }

    return tasks
  })
  .catch(catchError)
}

function Task (response) {
  var task = this
  Object.keys(response).forEach(function (key) {
    task[key] = response[key]
  })
}

Task.prototype.post = function (method, data) {
  var id = this.id

  var p

  if (data) {
    p = httpService.post(joinUrlElements(root, 'tasks', id, method), data)
  } else {
    p = httpService.post(joinUrlElements(root, 'tasks', id, method))
  }

  return p
  .then(function (response) {
    return new Task(response.data.task)
  })
  .catch(catchError)
}

Task.prototype.show = function () {
  return this.post('show')
}


Task.prototype.work = function () {
  return this.post('work')
}

Task.prototype.cancel = function () {
  return this.post('cancel')
}

Task.prototype.submit = function () {
  return this.post('submit')
}

Task.prototype.approve = function () {
  return this.post('approve')
}

Task.prototype.reject = function () {
  return this.post('reject')
}

Task.prototype.respond = function (response) {
  return this.post('respond', response)
}
