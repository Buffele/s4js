var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: new PeerId(packet.readUInt16LE()),
			unk: packet.readInt32LE(),
			remaining: packet.readRemaining()
		}
		return deserialized
	},
	serialize: function(id, unk, remaining) {
		var packet = new Packet()
		packet.writeUInt16LE(id.getValue())
		packet.writeInt32LE(unk)
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}