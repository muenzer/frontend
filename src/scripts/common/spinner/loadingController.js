module.exports = function LoadingController ($rootScope) {
  var vm = this
  var listener

  vm.$onInit = function () {
    vm.show = false
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate)
  }

  vm.$onDestroy = function () {
    listener()
  }

  function onSpinnerActivate (event, data) {
    vm.show = data.on
  }
}
