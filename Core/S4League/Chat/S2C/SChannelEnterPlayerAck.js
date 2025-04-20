var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			unk: packet.readUInt32LE(),
			exp: packet.readUInt32LE(),
			isGM: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(accountId, name, exp, isGM) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeUInt32LE(0) // Unk
		packet.writeUInt32LE(exp)
		packet.writeUInt8(+!!isGM)
		return packet.data.toBuffer()
	}
}