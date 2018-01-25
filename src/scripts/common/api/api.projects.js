'use strict'

module.exports = ProjectsService

var joinUrlElements = require('./join')

var httpService
var root

function ProjectsService ($http, apiroot) {
  httpService = $http
  root = apiroot
}

function Project (response) {
  var task = this
  Object.keys(response).forEach(function (key) {
    task[key] = response[key]
  })
}

function catchError (err) {
  console.log(err.message)
  return Promise.resolve(null)
}

ProjectsService.prototype.create = function (data) {
  return httpService.post(joinUrlElements(root, 'projects'), data)
  .then((response) => {
    return new Project(response)
  })
  .catch(catchError)
}

ProjectsService.prototype.getList = function () {
  return httpService.get(joinUrlElements(root, 'projects'))
  .then(function (response) {
    var projects = response.data.projects

    for (var i = 0, len = projects.length; i < len; i++) {
      projects[i] = new Project(projects[i])
    }

    return projects
  })
  .catch(catchError)
}
