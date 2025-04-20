var Packet = require('../../../Network/Packet')
var BinaryUtil = require('../../BinaryUtil')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: new PeerId(packet.readUInt16LE()),
			unk2: BinaryUtil.decompressFloat(packet.readInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(unk1.getValue())
		packet.writeInt16LE(BinaryUtil.compressFloat(unk2))
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}