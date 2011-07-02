var Base64;

Base64 = {

	rank: new Uint8Array([
		  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
		, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
		, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
		, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
		, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
	]),

	alphabet: new Uint8Array([
		  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80
		, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99,100,101,102
		,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118
		,119,120,121,122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
	]),

	encode: function(binary) {
		var
			  len = binary.length
			, alphabet = Base64.alphabet
			, buffer = new Uint8Array((len / 3 + 1) * 4 | 0)
			, ip = 0
			, op = 0
			, ibuf = [0, 0, 0]
			, bs
			, code;
		
		while (len) {
		
			bs = 0;
			
			for (var a = 0; a < 3; a++) {
				if (len) {
					ibuf[a] = binary[ip++];
					bs++;
					len--;
				} else {
					ibuf[a] = 0;
				}
			}
			
			if (bs) {
				buffer[op++] = alphabet[ibuf[0] >> 2];
				buffer[op++] =
					alphabet[((ibuf[0] & 0x03) << 4) |
						((ibuf[1] & 0xf0) >> 4)];
				buffer[op++] = (bs > 1 ?
					alphabet[((ibuf[1] & 0x0f) << 2) |
						((ibuf[2] & 0xc0) >> 6)] : 61);
				buffer[op++] = (bs > 2 ?
					alphabet[ibuf[2] & 0x3f] : 61);
			}
		}
		
		return String.fromCharCode.apply(String, buffer.subarray(0, op));
	},

	decode: function(string) {
		var
			  len = string.length
			, buffer = new Uint8Array(len / 4 * 3 | 0)
			, ranks = Base64.rank
			, i = 0
			, outptr = 0
			, last = [0, 0]
			, state = 0
			, save = 0
			, rank
			, code;
		
		while (len--) {
			code = string.charCodeAt(i++);
			rank = ranks[code-43];
			if (rank !== 255 && rank !== void 0) {
				last[1] = last[0];
				last[0] = code;
				save = (save << 6) | rank;
				state++;
				if (state === 4) {
					buffer[outptr++] = save >>> 16;
					if (last[1] !== 61 /* padding character */) {
						buffer[outptr++] = save >>> 8;
					}
					if (last[0] !== 61 /* padding character */) {
						buffer[outptr++] = save;
					}
					state = 0;
				}
			}
		}
		return buffer.subarray(0, outptr);
	}
};
