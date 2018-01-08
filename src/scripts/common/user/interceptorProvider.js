'use strict'

module.exports = function InterceptorProvider () {
  this.$get = function (tokenService) {
    return {
      request: request
    }

    function request (config) {
      var token = tokenService.retrieve()

      if ('url' in config && config.url.substr(config.url.length - 5) === '.html') {
        return config
      }

      if (token) {
        if (!('headers' in config)) {
          config.headers = {}
        }
        config.headers['Authorization'] = 'Bearer ' + token
      }

      return config
    }
  }
}
