'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('projects', [router.default, api])

var routeConfig = require('./projects.routes')
app.config(routeConfig)

var ProjectsController = require('./projects.controller')
app.component('projects', {
  templateUrl: 'templates/projects.html',
  controller: ProjectsController,
  controllerAs: 'vm',
  bindings: {
    projects: '<'
  }
})

module.exports = app.name
