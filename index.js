var xml2js = require('xml2js')
var loaderUtils = require('loader-utils')

function defaultFilter(){
  return true
}

function identity(xmlObj){
  return xmlObj
}

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
  this.cacheable(true)
  var callback = this.async()

  var options = loaderUtils.getOptions(this) || {}

  var parseOptions = options.parse || defaultParseOptions
  var stringifyOptions = options.stringify || defaultStringifyOptions
  var filterResource = options.filterResource || defaultFilter
  var filterContent = options.filterContent || defaultFilter
  var filterParsedContent = options.filterParsedContent || defaultFilter
  var changeXmlObj = options.changeXmlObj || identity

  if(!filterResource(this.resource) || !filterContent(content)){
    callback(null, content)
    return
  }

  xml2js.parseString(content, parseOptions, function(err, xmlObj){
    if(err){
      callback(err)
      return
    }

    if(!filterParsedContent(xmlObj)){
      callback(null, content)
      return
    }

    var newXmlObj = changeXmlObj(xmlObj)

    var builder = new xml2js.Builder(stringifyOptions)
    var xml = builder.buildObject(newXmlObj)

    callback(null, xml)
  })
}

module.exports.raw = false