'use strict'

module.exports = function setRoute ($stateProvider) {
  var state =
    {
      name: 'profile',
      url: '/profile',
      templateUrl: 'templates/profile.html',
      // controller: 'ProfileController',
      // controllerAs: 'vm',
      title: 'Profile',
      resolve: {
        api: 'api',
        profile: function (api) {
          return api.users.userInfo()
        }
      }
    }

  $stateProvider.state(state)
}
