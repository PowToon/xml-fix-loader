var xml2js = require('xml2js')
var loaderUtils = require('loader-utils')

function toLowerCase(value){
  return value && value.toLocaleLowerCase()
}

var defaultParseOptions = {
  tagNameProcessors: [toLowerCase],
  attrNameProcessors: [toLowerCase],
  preserveChildrenOrder: true,
  trim: true,
  async: true,
  strict: false
}

var defaultStringifyOptions = {}

module.exports = function(content) {
  this.cacheable(false)
  var callback = this.async()

  var options = loaderUtils.getOptions(this) || {}
  var parseOptions = options.parse || defaultParseOptions
  var stringifyOptions = options.stringify || defaultStringifyOptions

  xml2js.parseString(content, parseOptions, function(err, objXml){
    if(err){
      callback(err)
      return
    }

    var builder = new xml2js.Builder(stringifyOptions)
    var xml = builder.buildObject(objXml)
    callback(null, xml)
  })
}

module.exports.raw = false