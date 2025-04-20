var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: new PeerId(packet.readUInt16LE()),
			unk2: new PeerId(packet.readUInt16LE()),
			unk3: packet.readInt32LE(),
			unk4: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, unk3, unk4, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(unk1.getValue())
		packet.writeUInt16LE(unk2.getValue())
		packet.writeInt32LE(unk3)
		packet.writeInt16LE(BinaryUtil.compressFloat(unk4))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}