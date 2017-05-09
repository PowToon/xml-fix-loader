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
      
        //this will be pased to "xml2js.parseString(parse || defaultParseOptions)"
        parse: defaultParseOptions,
        
        // this will be passed to "new xml2js.Builder(stringify || defaultStringifyOptions)"
        stringify: defaultStringifyOptions
        
        // filter resources based on their resourcename
        filterResource: defaultFilter
        
        // filter resources based on their resourcename
        filterContent: defaultFilter
        
        // filter resources based on their resourcename
        filterParsedContent: defaultFilter
        
        // filter resources based on their resourcename
        changeXmlObj: identity
        
      }
    }
  ]
}
```

Where the arguments specified above are:

```
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
```