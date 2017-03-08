var xml2js = require('xml2js')

function toLowerCase(value){
  return value && value.toLocaleLowerCase()
}

var config = {
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