'use strict'

var angular = require('angular')
var api = require('../api')
var material = require('angular-material')
var httpAuthInterceptor = require('angular-http-auth')

var app = angular.module('common.user', [api, material, httpAuthInterceptor])

var AuthEventService = require('./auth')
app.factory('AuthEventService', AuthEventService)

app.run(function ($rootScope, AuthEventService) {
  $rootScope.$on('event:auth-loginRequired', function (AuthEventService) {
    AuthEventService.loginRequired()
  })
})

var AuthInterceptorProvider = require('./interceptorProvider')
app.provider('AuthInterceptorProvider', AuthInterceptorProvider)

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptorProvider')
})

var DialogService = require('./dialog')
app.factory('loginDialogService', DialogService)

var TokenService = require('./token')
app.factory('tokenService', TokenService)

var WidgetCtrl = require('./widget')
app.component('userWidget', {
  templateUrl: 'templates/userWidget.html',
  controller: WidgetCtrl,
  controllerAs: 'vm'
})

module.exports = app.name
