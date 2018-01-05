'use strict'

var angular = require('angular')
var restangular = require('restangular')

var app = angular.module('common.api', [restangular])

app.constant('API', 'https://j8raz7ltzd.execute-api.eu-central-1.amazonaws.com/dev')

var apiService = require('./apiService')
app.factory('api', apiService)

var apiConfig = require('./apiConfig')
app.run(apiConfig)

module.exports = app.name
