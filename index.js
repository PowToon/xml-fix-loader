var xml2js = require('xml2js')
var loaderUtils = require('loader-utils')

function defaultFilter(){
  return true
}

function identity(xmlObj){
  return xmlObj
}

var defaultParseOptions = {
  trim: true,
  async: true,
  strict: false,
  normalize: false,
  explicitChildren: true,
  preserveChildrenOrder: true
}

var defaultStringifyOptions = {}

module.exports = function(content) {
  this.cacheable(true)
  var callback = this.async()

  var options = loaderUtils.getOptions(this) || {}

  var parseOptions = options.parse || defaultParseOptions
  var preserveChildrenOrder = parseOptions.preserveChildrenOrder
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

    try{
      var newXmlObj = changeXmlObj(xmlObj)

      if(preserveChildrenOrder){
        newXmlObj = uniquifyXmlObj(newXmlObj, parseOptions)
      }

      var builder = new xml2js.Builder(stringifyOptions)
      var xml = builder.buildObject(newXmlObj)

      if(preserveChildrenOrder){
        xml = unUniquifyXml(xml)
      }

      callback(null, xml)
    }
    catch(err){
      callback(err)
    }
  })
}

module.exports.raw = false

function uniquifyXmlObj(xmlObj, parseOptions){
  var attrkey = parseOptions.attrkey || '$'
  var charkey = parseOptions.charkey || '_'
  var childkey = parseOptions.childkey || '$$'

  function uniquify(obj){
    const newXmlObj = {}

    if(obj[attrkey]){
      newXmlObj[attrkey] = obj[attrkey]
    }

    if(obj[charkey]){
      newXmlObj[charkey] = obj[charkey]
    }

    if(obj[childkey]){
      obj[childkey].forEach(function(child, key){
        newXmlObj[key + '_' + child['#name']] = [uniquify(child)]
      })
    }

    return newXmlObj
  }

  const rootName = Object.keys(xmlObj)[0]
  const root = xmlObj[rootName]

  const result = {}
  result[rootName] = uniquify(root)

  return result
}

function unUniquifyXml(content){
  return content.replace(/(<\/?)\d*?_/ig, '$1')
}