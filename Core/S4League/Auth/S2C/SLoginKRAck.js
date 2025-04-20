var Packet = require('../../../Network/Packet')

// TODO: Not sure about the structure!
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			accountId: packet.readUInt32LE(),
			nope: packet.readUInt32LE(),
			accountId2: packet.readUInt32LE(),
			unk1: packet.readProudString(),
			sessionId: packet.readProudString(),
			result: packet.readUInt8(),
			unk2: packet.readProudString(),
			unk3: packet.readProudString(),
			unk4: packet.readProudString(),
			token1: packet.readProudString(),
			token2: packet.readProudString(),
			token3: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(accountId, accountId2, unk1, sessionId, result, unk2, unk3, unk4, token1, token2, token3) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(accountId2)
		packet.writeProudString(unk1)
		packet.writeProudString(sessionId)
		packet.writeUInt8(result)
		packet.writeProudString(unk2)
		packet.writeProudString(unk3)
		packet.writeProudString(unk4)
		packet.writeProudString(token1)
		packet.writeProudString(token2)
		packet.writeProudString(token3)
		return packet.data.toBuffer()
	}
}