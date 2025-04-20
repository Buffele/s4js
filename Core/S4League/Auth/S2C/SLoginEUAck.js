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
			accessToken: packet.readProudString(),
			refreshToken: packet.readProudString(),
			expireDate: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(accountId, accountId2, unk1, sessionId, result, unk2, unk3, unk4, accessToken, refreshToken, expireDate) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeUInt32LE(0)             // codePage
		packet.writeProudString("1")         // location
		packet.writeProudString(sessionId)
		packet.writeUInt8(result)
		packet.writeProudString("2")         // blockmsg
		packet.writeProudString("3")         // blocktime
		packet.writeProudString("4")         // aeria access code
		packet.writeProudString(accessToken)
		packet.writeProudString(refreshToken)
		packet.writeProudString(expireDate)
		packet.writeUInt32LE(0)             // authresultcode
		packet.writeUInt32LE(0)             // detailcode
		packet.writeProudString("5")         // msg
		packet.writeProudString("6")         // usr nr
		packet.writeProudString("test")     // usr id
		packet.writeUInt32LE(0)             // codePage
		packet.writeUInt32LE(0)             // channelingIndex
		packet.writeProudString("7")         // channelingName
		return packet.data.toBuffer()
	}
}