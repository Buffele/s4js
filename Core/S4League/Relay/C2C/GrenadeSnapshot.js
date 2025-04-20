var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: new PeerId(packet.readUInt16LE()),
			position: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk1: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk2: packet.readInt8(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(id, position, unk1, unk2, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(id.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(position.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(position.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.z))
		packet.writeInt8(unk2)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}