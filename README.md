# xml-fix-loader

A webpack loader canonizing an xml, fixing issues like unquoted attributes:

`<div width=100px />` => `<div width="100px" />`