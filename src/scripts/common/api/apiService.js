'use strict'

var apiService = function (Restangular) {
  var service = {
    login: login,
    userInfo: userInfo,
    tasks: Restangular.service('tasks')
  }

  return service

  function login (credintials) {
    return Restangular.all('users').all('login').post(credintials)
    .then(function (response) {
      var token = response.user.token
      return token
    })
  }

  function userInfo () {
    return Restangular.all('users').getList()
  }
}

module.exports = apiService
