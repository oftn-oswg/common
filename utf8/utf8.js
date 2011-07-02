var Utf8 = {

	encode: function(string) {
		var
			  value = String(string)
			, len = value.length
			, code
			, code2
			, wc
			, bytes = 0
			, buffer
			, ip = 0
			, op = 0
			, size
			, first;
		
		// First we need to perform a check to see the string is valid, and
		// compute the total length of the encoded data
		
		while (len--) {
			code = value.charCodeAt(ip++);
			
			if (code >= 0xDC00 && code <= 0xDFFF) {
				throw new Error(
					"Invalid sequence in conversion input");
					
			} else if (code >= 0xD800 && code <= 0xDBFF) {
				if (len < 1) {
					throw new Error(
						"Partial character sequence at end of input");
				} else {
					code2 = value.charCodeAt(ip++);
					if ((code2 < 0xDC00) || (code2 > 0xDFFF)) {
						throw new Error(
							"Invalid sequence in conversion input");
							
					} else {
						wc = ((code2) - 0xd800) * 0x400 +
						      (code) - 0xdc00 + 0x10000;
					}
					len--;
				}
			} else {
				wc = code;
			}
			bytes += ((wc) < 0x80 ? 1 :
				((wc) < 0x800 ? 2 :
					((wc) < 0x10000 ? 3 :
						((wc) < 0x200000 ? 4 :
							((wc) < 0x4000000 ? 5 : 6)))));
		}
		
		// Now we know the string is valid and we re-iterate.
		
		buffer = new Uint8Array(bytes);
		len = value.length;
		ip = 0;
		
		while (len--) {
			code = value.charCodeAt(ip++);
			
			if (code >= 0xD800 && code <= 0xDBFF) {
				code2 = value.charCodeAt(ip++);
				wc = ((code2) - 0xd800) * 0x400 +
				      (code) - 0xdc00 + 0x10000;
				len--;
			} else {
				wc = code;
			}
			
			size = 0;

			if (wc < 0x80) {
				first = 0;
				size = 1;
			} else if (wc < 0x800) {
				first = 0xc0;
				size = 2;
			} else if (wc < 0x10000) {
				first = 0xe0;
				size = 3;
			} else if (wc < 0x200000) {
				first = 0xf0;
				size = 4;
			} else if (wc < 0x4000000) {
				first = 0xf8;
				size = 5;
			} else {
				first = 0xfc;
				size = 6;
			}

			for (var i = size - 1; i > 0; --i) {
				buffer[op + i] = (wc & 0x3f) | 0x80;
				wc >>= 6;
			}
			buffer[op] = wc | first;
			op += size;

		}
		
		return buffer;
		
	},
	
	decode: function(data) {
		throw new Error("Utf8.decode is not implemented");
	}
	
};
