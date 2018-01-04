'use strict'

var restangular = require('restangular')

var app = require('angular').module('common.api', [restangular])

app.constant('API', 'https://j8raz7ltzd.execute-api.eu-central-1.amazonaws.com/dev')

module.exports = app.name
