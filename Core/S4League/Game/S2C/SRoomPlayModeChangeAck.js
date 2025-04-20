var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			mode: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(playerId, mode) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt8(mode)
		return packet.data.toBuffer()
	}
}