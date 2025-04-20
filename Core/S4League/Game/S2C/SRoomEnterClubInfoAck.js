var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			clanName: packet.readProudString(),
			clanMarkId: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(clanId, clanName, clanMarkId) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeProudString(clanName)
		packet.writeProudString(clanMarkId)
		return packet.data.toBuffer()
	}
}