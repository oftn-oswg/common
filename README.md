Common
======

This repository houses many common algorithm implementations and data structures which can be dropped into larger projects, (any language is fine). They are designed to be general-purpose with a good focus on performance.


base64
------

### Base64.encode(data, [byteOffset], [byteLength])

Returns a Uint8Array of character codes of the base64 string.

 - `data`: An ArrayBuffer object
 - `byteOffset`: An optional offset used as the start of the buffer (default: 0)
 - `byteLength`: An optional length of data used to find the end (default: data.byteLength)

### Base64.decode(array)

Returns a Uint8Array of the byte stream (should really be ArrayBuffer).

 - `array`: Array of character codes of a base64 string (should really be a JavaScript string).



Data checksums
--------------

### md5

	MD5(data, [byteOffset], [byteLength])

Returns a computed hash of data as Uint8Array of 16 bytes

The arguments have the same meaning as listed above.


### sha256

	SHA256(data, [byteOffset], [byteLength])

Returns a computed hash of data as Uint8Array of 32 bytes

The arguments have the same meaning as listed above.


Encodings
---------

### UTF8.encode(string)

Returns an ArrayBuffer of the UTF8-encoded string

 - `string`: A JavaScript string


### UTF8.decode(...)

Not implemented!


spelling
--------

Look at the end of the file `spelling.js` for an example usage with Node.js.



## License

Copyright © 2012 [ΩF:∅ Working Group][1] members

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: http://wg.oftn.org
