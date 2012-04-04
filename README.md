Common
======

This repository houses many common algorithm implementations and data structures which can be dropped into larger projects. They are designed to be general-purpose with a good focus on performance.


base64
------

### Base64.encode(data, [byteOffset], [byteLength])

data: An ArrayBuffer object
byteOffset: optional byteOffset to start at (default: 0)
byteLength: optional byteLength to end at (default: data.byteLength)

returns: Uint8Array of character codes of the base64 string
You can possibly convert it into a string with: `String.fromCharCode.apply(String, return_value)`

### Base64.decode(array)

array: Array of character codes of a base64 string

returns: Uint8Array of the byte stream


md5
---

### MD5(data, [byteOffset], [byteLength])

data: An ArrayBuffer object
byteOffset: optional byteOffset to start at (default: 0)
byteLength: optional byteLength to end at (default: data.byteLength)

returns: Uint8Array of bytes


spelling
--------

Look at the end of the file `spelling.js` for an example usage with Node.js.



utf8
----

### UTF8.encode(string)

string: A JavaScript string

returns: Uint8Array of bytes in UTF8 format


### UTF8.decode(...)

Not implemented.

## License

Copyright © 2012 by The ΩF:∅ Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

© The ΩF:∅ Foundation
