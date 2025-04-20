var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

// TODO: Not sure about the flags and the stupid parsing
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			gameTime: packet.readUInt32LE(),
			unk1: packet.readUInt8(),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(gameTime, unk1, position, rotation, remaining) {
		var packet = new Packet()
		packet.writeUInt32LE(gameTime)
		packet.writeUInt8(unk1)
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}