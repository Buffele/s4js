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
			conditions: packet.readUInt8(),
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk1: BinaryUtil.decompressFloat(packet.readInt16LE()),
			damage: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk2: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk3: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk4: packet.readInt16LE(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(target, attackAttribute, gameTime, source, conditions, rotation, position, unk1, damage, unk2, unk3, unk4, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(target.getValue())
		packet.writeUInt8(attackAttribute)
		packet.writeUInt32LE(gameTime)
		packet.writeUInt16LE(source.getValue())
		packet.writeUInt8(conditions)
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1))
		packet.writeInt16LE(BinaryUtil.compressFloat(damage))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk3))
		packet.writeInt16LE(unk4)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}