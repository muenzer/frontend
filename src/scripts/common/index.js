'use strict'

var api = require('./api')

var app = require('angular').module('common', [api])

module.exports = app.name
