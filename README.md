# xml-fix-loader

A webpack loader canonizing xml files, fixing issues like unquoted attributes:

`<div width=100px />` => `<div width="100px" />`

The plugin uses [xml2js](https://www.npmjs.com/package/xml2js) to parse and stringify the xml to normalize it.


##Use:

```
{
  test: /\.xml/,
  use: [
    {
      loader: 'file-loader'
    },
    {
      loader: 'xml-fix-loader',
      options: {
      
        //this will be pased to "xml2js.parseString(parse || defaultParseString)"
        parse: {trim: false},
        
        // this will be passed to "new xml2js.Builder(stringify || defaultStringifyOptions)"
        stringify: {explicitRoot: false}
        
      }
    }
  ]
}
```

default `xml2js.parseString`'s options are:

```
function toLowerCase(value){
  return value && value.toLocaleLowerCase()
}

var defaultConfig = {
  tagNameProcessors: [toLowerCase],
  attrNameProcessors: [toLowerCase],
  preserveChildrenOrder: true,
  trim: true,
  async: true,
  // we really suggest not changing this one, since its accountable for fixing the svg:
  strict: false 
}
```

default `xml2js.Builder`'s options are: `{}`