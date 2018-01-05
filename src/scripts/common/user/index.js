'use strict'

var angular = require('angular')
var api = require('../api')
var material = require('angular-material')

var app = angular.module('common.user', [api, material])

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
