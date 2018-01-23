'use strict'

module.exports = function setRoute ($stateProvider) {
  var state =
    {
      name: 'tasks',
      url: '/tasks',
      component: 'tasks',
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
