var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			playerId: packet.readUInt64LE(),
			team: packet.readUInt8(),
			unk: packet.readUInt8() // gameMode?
		}

		return deserialized
	},
	serialize: function(playerId, team) {
		var packet = new Packet()
		packet.writeUInt64LE(playerId)
		packet.writeUInt8(team)
		packet.writeUInt8(1) // unk | gameMode?
		return packet.data.toBuffer()
	}
}