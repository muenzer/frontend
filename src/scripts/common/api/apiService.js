'use strict'

var apiService = function (Restangular) {
  var tasks = function tasks () {
    return Restangular.withConfig(function (config) {
      config.addElementTransformer('tasks', false, function (task) {
        task.addRestangularMethod('work', 'post', 'work')
        task.addRestangularMethod('submit', 'post', 'submit')
        task.addRestangularMethod('cancel', 'post', 'cancel')
        return task
      })
    }).service('tasks')
  }

  var service = {
    login: login,
    userInfo: userInfo,
    tasks: tasks()
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
