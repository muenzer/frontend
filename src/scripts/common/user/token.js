'use strict'

module.exports = function (api) {
  var $service = this

  $service.get = function (credintials) {
    return api.login(credintials)
    .then(function (response) {
      return response.data.user.token
    })
  }
}
