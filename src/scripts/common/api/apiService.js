'use strict'

var TasksService = require('./api.tasks')
var UsersService = require('./api.users')

var apiService = function ($http, API) {
  var service = {
    users: new UsersService($http, API),
    tasks: new TasksService($http, API)
  }

  return service
}

module.exports = apiService
