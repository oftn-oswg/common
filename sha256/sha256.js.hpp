#define SHA256_DATASIZE 64

var SHA256 = function(input, byteOffset, byteLength) {
	"use strict";

	if (Object.prototype.toString.call(input) !== "[object ArrayBuffer]")
		throw new TypeError("First argument must be an ArrayBuffer");

	byteOffset >>>= 0;
	byteLength = (byteLength != null ? byteLength >>> 0 : input.byteLength - byteOffset);

	var
		  checksum_h = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19])
		, input_trailing = byteLength & 0x3f
		, block_offset = byteOffset
		, block_num = (byteLength + 8) / SHA256_DATASIZE + 1 | 0
		, fill = 64
		, i, i_uint8, b
		, digest
		, tmp = new Uint32Array(2)
	;

	while (block_num--) {

		i = new DataView(new ArrayBuffer(256));
		i_uint8 = new Uint8Array(i.buffer);

		if (block_offset + SHA256_DATASIZE > byteLength) {
			if (input_trailing >= 0) {
				i_uint8.set(new Uint8Array(input, block_offset, input_trailing));
				i.setUint8(input_trailing, 0x80);
			}

			if (!block_num) {
				i.setUint32(SHA256_DATASIZE - 4, byteLength << 3);
			} else {
				input_trailing -= SHA256_DATASIZE;
			}

		} else {
			i_uint8.set(new Uint8Array(input, block_offset, SHA256_DATASIZE));
		}

		b = new Uint32Array(checksum_h);
		block_offset += SHA256_DATASIZE;


#define SHR(x,n)        ((x & 0xFFFFFFFF) >>> n)
#define ROTR(x,n)       (SHR (x,n) | (x << (32 - n)))

#define S0(x) (ROTR (x, 7) ^ ROTR (x,18) ^  SHR (x, 3))
#define S1(x) (ROTR (x,17) ^ ROTR (x,19) ^  SHR (x,10))
#define S2(x) (ROTR (x, 2) ^ ROTR (x,13) ^ ROTR (x,22))
#define S3(x) (ROTR (x, 6) ^ ROTR (x,11) ^ ROTR (x,25))

#define F0(x,y,z) ((x & y) | (z & (x | y)))
#define F1(x,y,z) (z ^ (x & (y ^ z)))

#define R(t)    (i.setUint32(t, ((S1(i.getUint32(t - 8)) + i.getUint32(t - 28) >>> 0) + \
                                  S0(i.getUint32(t - 60)) >>> 0) + i.getUint32(t - 64)), i.getUint32(t))

#define P(a,b,c,d,e,f,g,h,x,K) \
        tmp[0] = (((h + S3(e) >>> 0) + F1(e,f,g) >>> 0) + K >>> 0) + x;          \
        tmp[1] = S2(a) + F0(a,b,c);                      \
        d += tmp[0]; h = tmp[0] + tmp[1]

#define A b[0]
#define B b[1]
#define C b[2]
#define D b[3]
#define E b[4]
#define F b[5]
#define G b[6]
#define H b[7]

		P (A, B, C, D, E, F, G, H, i.getUint32(0), 0x428A2F98);
		P (H, A, B, C, D, E, F, G, i.getUint32(4), 0x71374491);
		P (G, H, A, B, C, D, E, F, i.getUint32(8), 0xB5C0FBCF);
		P (F, G, H, A, B, C, D, E, i.getUint32(12), 0xE9B5DBA5);
		P (E, F, G, H, A, B, C, D, i.getUint32(16), 0x3956C25B);
		P (D, E, F, G, H, A, B, C, i.getUint32(20), 0x59F111F1);
		P (C, D, E, F, G, H, A, B, i.getUint32(24), 0x923F82A4);
		P (B, C, D, E, F, G, H, A, i.getUint32(28), 0xAB1C5ED5);
		P (A, B, C, D, E, F, G, H, i.getUint32(32), 0xD807AA98);
		P (H, A, B, C, D, E, F, G, i.getUint32(36), 0x12835B01);
		P (G, H, A, B, C, D, E, F, i.getUint32(40), 0x243185BE);
		P (F, G, H, A, B, C, D, E, i.getUint32(44), 0x550C7DC3);
		P (E, F, G, H, A, B, C, D, i.getUint32(48), 0x72BE5D74);
		P (D, E, F, G, H, A, B, C, i.getUint32(52), 0x80DEB1FE);
		P (C, D, E, F, G, H, A, B, i.getUint32(56), 0x9BDC06A7);
		P (B, C, D, E, F, G, H, A, i.getUint32(60), 0xC19BF174);
		P (A, B, C, D, E, F, G, H, R(64), 0xE49B69C1);
		P (H, A, B, C, D, E, F, G, R(68), 0xEFBE4786);
		P (G, H, A, B, C, D, E, F, R(72), 0x0FC19DC6);
		P (F, G, H, A, B, C, D, E, R(76), 0x240CA1CC);
		P (E, F, G, H, A, B, C, D, R(80), 0x2DE92C6F);
		P (D, E, F, G, H, A, B, C, R(84), 0x4A7484AA);
		P (C, D, E, F, G, H, A, B, R(88), 0x5CB0A9DC);
		P (B, C, D, E, F, G, H, A, R(92), 0x76F988DA);
		P (A, B, C, D, E, F, G, H, R(96), 0x983E5152);
		P (H, A, B, C, D, E, F, G, R(100), 0xA831C66D);
		P (G, H, A, B, C, D, E, F, R(104), 0xB00327C8);
		P (F, G, H, A, B, C, D, E, R(108), 0xBF597FC7);
		P (E, F, G, H, A, B, C, D, R(112), 0xC6E00BF3);
		P (D, E, F, G, H, A, B, C, R(116), 0xD5A79147);
		P (C, D, E, F, G, H, A, B, R(120), 0x06CA6351);
		P (B, C, D, E, F, G, H, A, R(124), 0x14292967);
		P (A, B, C, D, E, F, G, H, R(128), 0x27B70A85);
		P (H, A, B, C, D, E, F, G, R(132), 0x2E1B2138);
		P (G, H, A, B, C, D, E, F, R(136), 0x4D2C6DFC);
		P (F, G, H, A, B, C, D, E, R(140), 0x53380D13);
		P (E, F, G, H, A, B, C, D, R(144), 0x650A7354);
		P (D, E, F, G, H, A, B, C, R(148), 0x766A0ABB);
		P (C, D, E, F, G, H, A, B, R(152), 0x81C2C92E);
		P (B, C, D, E, F, G, H, A, R(156), 0x92722C85);
		P (A, B, C, D, E, F, G, H, R(160), 0xA2BFE8A1);
		P (H, A, B, C, D, E, F, G, R(164), 0xA81A664B);
		P (G, H, A, B, C, D, E, F, R(168), 0xC24B8B70);
		P (F, G, H, A, B, C, D, E, R(172), 0xC76C51A3);
		P (E, F, G, H, A, B, C, D, R(176), 0xD192E819);
		P (D, E, F, G, H, A, B, C, R(180), 0xD6990624);
		P (C, D, E, F, G, H, A, B, R(184), 0xF40E3585);
		P (B, C, D, E, F, G, H, A, R(188), 0x106AA070);
		P (A, B, C, D, E, F, G, H, R(192), 0x19A4C116);
		P (H, A, B, C, D, E, F, G, R(196), 0x1E376C08);
		P (G, H, A, B, C, D, E, F, R(200), 0x2748774C);
		P (F, G, H, A, B, C, D, E, R(204), 0x34B0BCB5);
		P (E, F, G, H, A, B, C, D, R(208), 0x391C0CB3);
		P (D, E, F, G, H, A, B, C, R(212), 0x4ED8AA4A);
		P (C, D, E, F, G, H, A, B, R(216), 0x5B9CCA4F);
		P (B, C, D, E, F, G, H, A, R(220), 0x682E6FF3);
		P (A, B, C, D, E, F, G, H, R(224), 0x748F82EE);
		P (H, A, B, C, D, E, F, G, R(228), 0x78A5636F);
		P (G, H, A, B, C, D, E, F, R(232), 0x84C87814);
		P (F, G, H, A, B, C, D, E, R(236), 0x8CC70208);
		P (E, F, G, H, A, B, C, D, R(240), 0x90BEFFFA);
		P (D, E, F, G, H, A, B, C, R(244), 0xA4506CEB);
		P (C, D, E, F, G, H, A, B, R(248), 0xBEF9A3F7);
		P (B, C, D, E, F, G, H, A, R(252), 0xC67178F2);




#undef SHR
#undef ROTR
#undef S0
#undef S1
#undef S2
#undef S3
#undef F0
#undef F1
#undef R
#undef P

		checksum_h[0] += A;
		checksum_h[1] += B;
		checksum_h[2] += C;
		checksum_h[3] += D;
		checksum_h[4] += E;
		checksum_h[5] += F;
		checksum_h[6] += G;
		checksum_h[7] += H;

#undef A
#undef B
#undef C
#undef D
#undef E
#undef F
#undef G
#undef H

	}

	digest = new DataView(new ArrayBuffer(32));
	digest.setUint32(0,  checksum_h[0]);
	digest.setUint32(4,  checksum_h[1]);
	digest.setUint32(8,  checksum_h[2]);
	digest.setUint32(12, checksum_h[3]);
	digest.setUint32(16, checksum_h[4]);
	digest.setUint32(20, checksum_h[5]);
	digest.setUint32(24, checksum_h[6]);
	digest.setUint32(28, checksum_h[7]);

	return new Uint8Array(digest.buffer);
};
