var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			owner: new PeerId(packet.readUInt16LE()),
			id: new PeerId(packet.readUInt16LE()),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			unk1: packet.readInt32LE(),
			unk2: packet.readInt32LE(),
			unk3: packet.readInt8(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(owner, id, position, rotation, unk1, unk2, unk3, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(owner.getValue())
		packet.writeUInt16LE(id.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeInt32LE(unk1)
		packet.writeInt32LE(unk2)
		packet.writeInt8(unk3)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}