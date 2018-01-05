'use strict'

var apiService = function (Restangular) {
  var service = {
    login: login,
    userInfo: userInfo
  }

  return service

  function login (credintials) {
    return Restangular.all('users').all('login').post(credintials)
  }

  function userInfo () {
    return Restangular.all('users').getList()
  }
}

module.exports = apiService
