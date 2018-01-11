'use strict'

var api = require('../common/api')
var router = require('@uirouter/angularjs')

var app = require('angular').module('profile', [router.default, api])

var routeConfig = require('./profile.routes')
app.config(routeConfig)

var ProfileController = require('./profile.controller')
app.controller('ProfileController', ProfileController)

module.exports = app.name
