var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			username: packet.readProudString(),
			password: packet.readProudString(),
			unk1: packet.readProudString(),
			unk2: packet.readProudString(),
			resourceChecksum: packet.readProudString(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readProudString(),
			unk7: packet.readUInt32LE(),
			unk8: packet.readProudString(),
			unk9: packet.readProudString(),
			aeriaAccCode: packet.readProudString(),
			accessToken: packet.readProudString(),
			refreshToken: packet.readProudString(),
			expireDate: packet.readProudString(),
			unk10: packet.readProudString(),
			unk11: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(username, password, unk1, unk2, resourceChecksum, unk3, unk4, unk5, unk6, unk7, unk8, unk9, aeriaAccCode, accessToken, refreshToken, expireDate) {
		var packet = new Packet()
		packet.writeProudString(username)
		packet.writeProudString(password)
		packet.writeProudString(unk1)
		packet.writeProudString(unk2)
		packet.writeProudString(resourceChecksum)
		packet.writeUInt32LE(unk3)
		packet.writeUInt32LE(unk4)
		packet.writeUInt32LE(unk5)
		packet.writeProudString(unk6)
		packet.writeUInt32LE(unk7)
		packet.writeProudString(unk8)
		packet.writeProudString(unk9)
		packet.writeProudString(aeriaAccCode)
		packet.writeProudString(accessToken)
		packet.writeProudString(refreshToken)
		packet.writeProudString(expireDate)
		packet.writeProudString('') // Unk10
		packet.writeProudString('') // Unk11
		return packet.data.toBuffer()
	}
}