'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('projects', [router.default, api])

var routeConfig = require('./projects.routes')
app.config(routeConfig)

module.exports = app.name
