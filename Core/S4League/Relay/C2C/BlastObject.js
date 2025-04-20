var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			player: new PeerId(packet.readUInt16LE()),
			unk: [],
			remaining: null
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.unk.push(packet.readUInt32LE())
		}

		deserialized.remaining = packet.readRemaining()

		return deserialized
	},
	serialize: function(player, unk, remaining) {
		var packet = new Packet()

		packet.writeUInt32LE(unk.length)
		for (var i = 0; i < unk.length; i++) {
			packet.writeUInt32LE(unk[i])
		}
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}