'use strict'

var api = require('./api')
var user = require('./user')
var spinner = require('./spinner')

var app = require('angular').module('common', [api, user, spinner])

module.exports = app.name
