var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: BinaryUtil.decompressFloat(packet.readInt16LE()),
			values: [], // ValueDto
			remaining: null
		}

		// TODO: Read ValueDto
		//var count = packet.readUInt32LE()

		deserialized.remaining = packet.readRemaining()

		return deserialized
	},
	serialize: function(unk, values) {
		var packet = new Packet()
		packet.writeInt16LE(BinaryUtil.compressFloat(unk))
		return packet.data.toBuffer()
	}
}