var Utf8 = {

	encode: function(string) {
		var
			  value = String(string)
			, inputlength = value.length
			, code
			, codehi
			, character
			, bytes = 0
			, buffer
			, ip = 0
			, op = 0
			, size
			, first;
		
		// First we need to perform a check to see the string is valid, and
		// compute the total length of the encoded data
		
		while (inputlength--) {
			code = value.charCodeAt(ip++);
			
			if (code >= 0xDC00 && code <= 0xDFFF) {
				throw new Error(
					"Invalid sequence in conversion input");
					
			} else if (code >= 0xD800 && code <= 0xDBFF) {
				if (inputlength < 1) {
					throw new Error(
						"Partial character sequence at end of input");
						
				} else {
					codehi = value.charCodeAt(ip++);
					if ((codehi < 0xDC00) || (codehi > 0xDFFF)) {
						throw new Error(
							"Invalid sequence in conversion input");
							
					} else {
						character = ((codehi) - 0xd800) * 0x400 +
						      (code) - 0xdc00 + 0x10000;
					}
					inputlength--;
				}
			} else {
				character = code;
			}
			bytes += ((character) < 0x80 ? 1 :
				((character) < 0x800 ? 2 :
					((character) < 0x10000 ? 3 :
						((character) < 0x200000 ? 4 :
							((character) < 0x4000000 ? 5 : 6)))));
		}
		
		// Now we know the string is valid and we re-iterate.
		
		buffer = new Uint8Array(bytes);
		inputlength = value.length;
		ip = 0;
		
		while (inputlength--) {
			code = value.charCodeAt(ip++);
			
			if (code >= 0xD800 && code <= 0xDBFF) {
				codehi = value.charCodeAt(ip++);
				character = ((codehi) - 0xd800) * 0x400 +
				      (code) - 0xdc00 + 0x10000;
				inputlength--;
			} else {
				character = code;
			}
			
			size = 0;

			if (character < 0x80) {
				first = 0;
				size = 1;
			} else if (character < 0x800) {
				first = 0xc0;
				size = 2;
			} else if (character < 0x10000) {
				first = 0xe0;
				size = 3;
			} else if (character < 0x200000) {
				first = 0xf0;
				size = 4;
			} else if (character < 0x4000000) {
				first = 0xf8;
				size = 5;
			} else {
				first = 0xfc;
				size = 6;
			}

			for (var i = op + size - 1; i > op; i--) {
				buffer[i] = (character & 0x3f) | 0x80;
				character >>= 6;
			}
			buffer[op] = character | first;
			op += size;

		}
		
		return buffer;
		
	},
	
	decode: function(data) {
		throw new Error("Utf8.decode is not implemented");
	}
	
};
