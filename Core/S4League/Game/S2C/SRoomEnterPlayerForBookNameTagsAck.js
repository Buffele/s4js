var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			team: packet.readUInt8(),
			unk1: packet.readUInt8(), // gameMode?
			exp: packet.readUInt32LE(),
			name: packet.readProudString(),
			unk2: packet.readUInt8(),
			unk3: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(accountId, team, exp, name) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt8(team)
		packet.writeUInt8(1) // unk1 | gameMode?
		packet.writeUInt32LE(exp)
		packet.writeProudString(name)
		packet.writeUInt8(1) // unk2
		packet.writeUInt32LE(0) // unk3
		return packet.data.toBuffer()
	}
}