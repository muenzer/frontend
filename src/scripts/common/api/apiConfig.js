'use strict'

var apiConfig = function (Restangular, API) {
  Restangular.setBaseUrl(API)

  Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    var extractedData
    // .. to look for getList operations
    if (operation === 'getList') {
      // .. and handle the data and meta data
      extractedData = data[what]
      extractedData.count = data.count
    } else {
      extractedData = data[Object.keys(data)[0]]
    }
    return extractedData
  })
}

module.exports = apiConfig
