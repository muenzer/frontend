'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('profile', [router.default, api])

var routeConfig = require('./profile.routes')
app.config(routeConfig)

module.exports = app.name
