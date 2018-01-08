'use strict'

module.exports = function ($window) {
  var tokenAddress = 'accessToken'

  var service = {
    save: save,
    retrieve: retrieve,
    remove: remove
  }

  return service

  function save (token) {
    $window.localStorage.setItem(tokenAddress, token)
    return token
  }

  function retrieve () {
    var token = $window.localStorage.getItem(tokenAddress)
    return token
  }

  function remove () {
    $window.localStorage.removeItem(tokenAddress)
    return 'removed'
  }
}
