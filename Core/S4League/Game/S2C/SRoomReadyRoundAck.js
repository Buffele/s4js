var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			isReady: packet.readUInt8(),
			unk: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(playerId, isReady) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt8(isReady)
		packet.writeUInt8(0) // unk
		return packet.data.toBuffer()
	}
}