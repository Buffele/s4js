var Packet = require('../../../Network/Packet')

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
			unk5: packet.readProudString(), // token1
			unk6: packet.readProudString(), // token2
			unk7: packet.readProudString() // token3
		}

		return deserialized
	},
	serialize: function(accountId, accountId2, unk1, sessionId, result, unk2, unk3, unk4, unk5, unk6, unk7) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(accountId2)
		packet.writeProudString(unk1)
		packet.writeProudString(sessionId)
		packet.writeUInt8(result)
		packet.writeProudString(unk2)
		packet.writeProudString(unk3)
		packet.writeProudString(unk4)
		packet.writeProudString(unk5) // token1
		packet.writeProudString(unk6) // token2
		packet.writeProudString(unk7) // token3
		return packet.data.toBuffer()
	}
}