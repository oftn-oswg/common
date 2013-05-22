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
