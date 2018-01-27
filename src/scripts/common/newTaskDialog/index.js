'use strict'

var angular = require('angular')
var api = require('../api')

var material = require('angular-material')

var schemaForm = require('angular-schema-form')  // doesn't export name
require('angular-schema-form-material') // doesn't export name

var app = angular.module('common.newTaskDialog', [api, material, schemaForm.name])

var DialogService = require('./dialog')
app.factory('newTaskDialogService', DialogService)

module.exports = app.name
