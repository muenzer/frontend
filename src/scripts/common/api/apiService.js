'use strict'

var TasksService = require('./api.tasks')
var ProjectsService = require('./api.projects')
var UsersService = require('./api.users')

var apiService = function ($http, API) {
  var service = {
    users: new UsersService($http, API),
    projects: new ProjectsService($http, API),
    tasks: new TasksService($http, API)
  }

  return service
}

module.exports = apiService
