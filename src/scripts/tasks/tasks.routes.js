'use strict'

module.exports = function setRoute ($stateProvider) {
  var state =
    {
      name: 'tasks',
      url: '/tasks',
      templateUrl: 'templates/tasks.html',
      controller: 'TasksController',
      controllerAs: 'vm',
      title: 'Tasks',
      resolve: {
        api: 'api',
        tasks: function (api) {
          return api.tasks.getList()
        }
      }
    }

  $stateProvider.state(state)
}
