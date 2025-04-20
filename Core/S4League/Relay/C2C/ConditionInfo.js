var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: new PeerId(packet.readUInt16LE()), // Ignored?
			unk2: new PeerId(packet.readUInt16LE()),
			unk3: packet.readInt32LE(),
			unk4: packet.readProudBuffer(),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(unk1, unk2, unk3, unk4, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(unk1.getValue()) // Ignored?
		packet.writeUInt16LE(unk2.getValue())
		packet.writeInt32LE(unk3)
		packet.writeProudBuffer(unk4)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}