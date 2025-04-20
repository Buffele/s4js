var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt32LE(),
			playerIds: []
		}

		var count = packet.readUInt32LE() // TODO: max 299
		for (var i = 0; i < count; i++) {
			deserialized.playerIds.push(packet.readUInt64LE())
		}

		return deserialized
	},
	serialize: function(type, playerIds) {
		var packet = new Packet()
		packet.writeUInt32LE(type)
		packet.writeUInt32LE(playerIds.length)
		for (var i = 0; i < playerIds.length; i++) {
			packet.writeUInt64LE(playerIds[i])
		}
		return packet.data.toBuffer()
	}
}