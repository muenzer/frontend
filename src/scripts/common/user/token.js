'use strict'

module.exports = function (api, $window) {
  var service = {
    get: get
  }

  return service

  function get (credintials) {
    return api.login(credintials)
    .then(function (response) {
      var token = response.user.token
      $window.localStorage.setItem('accessToken', token)
      return token
    })
  }
}
