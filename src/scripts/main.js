'use strict'

var angular = require('angular')
var ngMaterial = require('angular-material')
var common = require('./common')
var tasks = require('./tasks')
var projects = require('./projects')
var profile = require('./profile')

angular.module('app',
  [
    ngMaterial,
    common,
    tasks,
    projects,
    profile
  ])
  .config(IconConfig)
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('tasks')
  })

function IconConfig ($mdIconProvider) {
  $mdIconProvider
  .defaultFontSet('FontAwesome')
  .fontSet('fa', 'FontAwesome')
}
