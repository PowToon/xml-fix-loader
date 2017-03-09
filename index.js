var xml2js = require('xml2js')
var loaderUtils = require('loader-utils')
var defaults = require('lodash.defaults')

function toLowerCase(value){
  return value && value.toLocaleLowerCase()
}

var defaultConfig = {
  tagNameProcessors: [toLowerCase],
  attrNameProcessors: [toLowerCase],
  preserveChildrenOrder: true,
  trim: true,
  async: true,
  strict: false
}

module.exports = function(content) {
  this.cacheable(false)
  var callback = this.async()

  const options = loaderUtils.getOptions(this);
  var config = defaults({}, options, defaultConfig)

  xml2js.parseString(content, config, function(err, objXml){
    if(err){
      callback(err)
      return
    }

    var builder = new xml2js.Builder()
    var xml = builder.buildObject(objXml)
    callback(null, xml)
  })
}

module.exports.raw = false