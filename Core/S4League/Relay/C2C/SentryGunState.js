var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: new PeerId(packet.readUInt16LE()),
			unk1: packet.readInt8(),
			unk2: new PeerId(packet.readUInt16LE()),
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(id, unk1, unk2, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(id.getValue())
		packet.writeInt8(unk1)
		packet.writeUInt16LE(unk2.getValue())
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}