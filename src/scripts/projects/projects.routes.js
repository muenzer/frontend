'use strict'

module.exports = function setRoute ($stateProvider) {
  var state =
    {
      name: 'projects',
      url: '/projects',
      // component: 'tasks',
      title: 'Projects',
      resolve: {
        api: 'api',
        projects: function (api) {
          return api.projects.getList()
        }
      }
    }

  $stateProvider.state(state)
}
