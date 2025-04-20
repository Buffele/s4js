var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			player: new PeerId(packet.readUInt16LE()),
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
			remaining: packet.readRemaining() // There is a lot more...
		}
		return deserialized
	},
	serialize: function(player, position, unk, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(player.getValue())
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