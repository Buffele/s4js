module.exports = {
	compressFloat: function(value) {
		var converter = Buffer.alloc(4)
		converter.writeFloatLE(value, 0, true)
		var tmp = converter.readInt32LE()
		
		var value1 = (tmp & 0x80000000) >> 31
		var value2 = ((tmp & 0x7F800000) >> 23) - 127
		var value3 = tmp & 0x7FFFFF
		
		var converter2 = Buffer.alloc(2)
		converter2.writeInt16LE(((value1 << 15) | ((value2 + 7) << 9) | (value3 >> 14)), 0, true)
		return converter2.readUInt16LE()
	},
	decompressFloat: function(value) {
		var result = ((value & 0x1FF) << 14) | ((((value & 0x7F00) >> 9) - 7 + 127) << 23) | ((value & 0x8000) >> 15 << 31)
		var converter = Buffer.alloc(4)
		converter.writeInt32LE(result, 0, true)
		return converter.readFloatLE()
	}
}