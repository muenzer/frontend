'use strict'

var angular = require('angular')
var ngMaterial = require('angular-material')
var common = require('./common')
var tasks = require('./tasks')
var profile = require('./profile')

angular.module('app',
  [
    ngMaterial,
    common,
    tasks,
    profile
  ])
  .config(IconConfig)

function IconConfig ($mdIconProvider) {
  $mdIconProvider
  .defaultFontSet('FontAwesome')
  .fontSet('fa', 'FontAwesome')
}
