var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(),
			receiverName: packet.readProudString(),
			senderAccountId: packet.readUInt64LE(),
			senderName: packet.readProudString(),
			message: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(result, receiverName, senderAccountId, senderName, message) {
		var packet = new Packet()
		packet.writeUInt32LE(result)
		packet.writeProudString(receiverName)
		packet.writeUInt64LE(senderAccountId)
		packet.writeProudString(senderName)
		packet.writeProudString(message)
		return packet.data.toBuffer()
	}
}