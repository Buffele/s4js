var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')

// TODO: Structure completly wrong!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readInt32LE(),
			unk2: BinaryUtil.decompressFloat(packet.readInt16LE()),
			hp: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk3: BinaryUtil.decompressFloat(packet.readInt16LE()),
			mp: BinaryUtil.decompressFloat(packet.readInt16LE()),
			unk4: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, hp, unk3, mp, unk4) {
		var packet = new Packet()
		packet.writeInt32LE(unk1)
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2))
		packet.writeInt16LE(BinaryUtil.compressFloat(hp))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk3))
		packet.writeInt16LE(BinaryUtil.compressFloat(mp))
		packet.writeInt16LE(BinaryUtil.compressFloat(unk4))
		return packet.data.toBuffer()
	}
}