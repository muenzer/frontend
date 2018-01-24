'use strict'

module.exports = function (profile, tasks, projects) {
  var vm = this

  vm.profile = profile
  vm.tasks = tasks
  vm.projects = projects
}
