var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

// TODO: Flags!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			target: new PeerId(packet.readUInt16LE()),
			attackAttribute: packet.readUInt8(),
			gameTime: packet.readUInt32LE(),
			source: new PeerId(packet.readUInt16LE()),
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk: BinaryUtil.decompressFloat(packet.readInt16LE()),
			damage: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(target, attackAttribute, gameTime, source, rotation, position, unk, damage, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(target.getValue())
		packet.writeUInt8(attackAttribute)
		packet.writeUInt32LE(gameTime)
		packet.writeUInt16LE(source.getValue())
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk))
		packet.writeInt16LE(BinaryUtil.compressFloat(damage))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}