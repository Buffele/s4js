var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt32LE(),
			unk: packet.readUInt16LE(),
			peerId: new PeerId(packet.readUInt16LE())
		}

		return deserialized
	},
	serialize: function(playerId, unk, peerId) {
		var packet = new Packet()
		packet.writeUInt32LE(playerId)
		packet.writeUInt16LE(unk)
		packet.writeUInt16LE(peerId.getValue())
		return packet.data.toBuffer()
	}
}