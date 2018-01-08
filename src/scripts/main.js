'use strict'

var angular = require('angular')
var ngMaterial = require('angular-material')
var common = require('./common')
var tasks = require('./tasks')

angular.module('app',
  [
    ngMaterial,
    common,
    tasks
  ])
  .config(IconConfig)

function IconConfig ($mdIconProvider) {
  $mdIconProvider
  .defaultFontSet('FontAwesome')
  .fontSet('fa', 'FontAwesome')
}
