var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			current: BinaryUtil.decompressFloat(packet.readInt16LE()),
			max: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(current, max, remaining) {
		var packet = new Packet()
		packet.writeInt16LE(BinaryUtil.compressFloat(current))
		packet.writeInt16LE(BinaryUtil.compressFloat(max))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}