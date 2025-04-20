var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var LongPeerId = require('../../LongPeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			peerId: new LongPeerId(packet.readUInt64LE()),
			position: {
				x: packet.readInt16LE(),
				y: packet.readInt16LE(),
				z: packet.readInt16LE()
			},
			rotation: {
				x: packet.readUInt8(),
				y: packet.readUInt8()
			},
			unk1: packet.readInt8(),
			unk2: packet.readUInt32LE(),
			unk3: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk4: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk5: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(peerId, position, rotation, unk1, unk2, unk3, unk4, unk5, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(peerId.getValue())
		packet.writeInt16LE(position.x)
		packet.writeInt16LE(position.y)
		packet.writeInt16LE(position.z)
		packet.writeUInt8(rotation.x)
		packet.writeUInt8(rotation.y)
		packet.writeInt8(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeInt16LE(BinaryUtil.compressFloat(unk3))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk4))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk5))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}