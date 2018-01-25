module.exports = function () {
  var re1 = new RegExp('^\\/|\\/$', 'g')
  var elts = Array.prototype.slice.call(arguments)
  return elts.map(function (element) { return element.toString().replace(re1, '') }).join('/')
}
