module.exports = function(content) {
  this.cacheable && this.cacheable()
  var callback = this.async()
  callback(content)
}