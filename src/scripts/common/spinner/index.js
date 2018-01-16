'use strict'

var angular = require('angular')
var material = require('angular-material')

var app = angular.module('common.spinner', [material])

var LoadingHttpInterceptor = require('./loadingHttpInterceptor')
app.factory('loadingHttpInterceptor', LoadingHttpInterceptor)

var LoadingController = require('./loadingController')
app.component('spinner', {
  templateUrl: 'templates/spinner.html',
  controller: LoadingController,
  controllerAs: 'vm'
})

app.config(config)

function config ($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor')
}

module.exports = app.name
