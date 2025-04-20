var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			remaining: packet.readRemaining() // There is sometimes more? I don't know...
		}
		return deserialized
	},
	serialize: function(position, unk, remaining) {
		var packet = new Packet()
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk.z))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}