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