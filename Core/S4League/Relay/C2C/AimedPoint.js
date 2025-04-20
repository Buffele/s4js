var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			},
			unk2: {
				x: BinaryUtil.decompressFloat(packet.readInt16LE()),
				y: BinaryUtil.decompressFloat(packet.readInt16LE()),
				z: BinaryUtil.decompressFloat(packet.readInt16LE())
			}
		}
		return deserialized
	},
	serialize: function(unk1, unk1) {
		var packet = new Packet()
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk1.z))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2.x))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2.y))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2.z))
		return packet.data.toBuffer()
	}
}