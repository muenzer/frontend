'use strict'

var apiService = function (Restangular) {
  var service = {
    login: login
  }

  return service

  function login (credintials) {
    return Restangular.all('users').all('login').post(credintials)
    .then(function (response) {
      var token = response.user.token
      return token
    })
  }
}

module.exports = apiService
