'use strict'

var api = require('./api')
var user = require('./user')

var app = require('angular').module('common', [api, user])

module.exports = app.name
