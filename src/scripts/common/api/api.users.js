'use strict'

module.exports = UsersService

var joinUrlElements = function () {
  var re1 = new RegExp('^\\/|\\/$', 'g')
  var elts = Array.prototype.slice.call(arguments)
  return elts.map(function (element) { return element.toString().replace(re1, '') }).join('/')
}

var httpService
var root

function UsersService ($http, apiroot) {
  httpService = $http
  root = apiroot
}

UsersService.prototype.login = function (credentials) {
  if (typeof credentials === 'undefined') {
    return Promise.reject(new Error('no credentials provided'))
  }
  return httpService.post(joinUrlElements(root, 'users', 'login'), credentials)
  .then(function (response) {
    var token = response.data.user.token
    return token
  })
}

UsersService.prototype.userInfo = function () {
  return httpService.get(joinUrlElements(root, 'users'))
  .then(function (response) {
    return response.data.user
  })
}
