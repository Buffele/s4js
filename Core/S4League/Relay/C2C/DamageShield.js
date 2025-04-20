var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(unk, remaining) {
		var packet = new Packet()
		packet.writeInt16LE(BinaryUtil.compressFloat(unk))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}