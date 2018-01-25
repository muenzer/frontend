'use strict'

module.exports = function setRoute ($stateProvider) {
  var state =
    {
      name: 'projects',
      url: '/projects',
      // component: 'tasks',
      title: 'Projects'
      // resolve: {
      //   api: 'api',
      //   tasks: function (api) {
      //     return api.tasks.getList()
      //   }
      // }
    }

  $stateProvider.state(state)
}
