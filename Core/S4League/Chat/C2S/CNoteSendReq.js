var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			receiver: packet.readProudString(),
			receiverAccountId: packet.readUInt64LE(),
			subject: packet.readProudString(),
			text: packet.readProudString(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			type: packet.readUInt8(),
			remaining: packet.readRemaining() // TODO
		}

		return deserialized
	},
	serialize: function(receiver, receiverAccountId, subject, text, unk1, unk2, type, remaining) {
		var packet = new Packet()
		packet.writeProudString(receiver)
		packet.writeUInt64LE(receiverAccountId)
		packet.writeProudString(subject)
		packet.writeProudString(text)
		packet.writeUInt32LE(unk1)
		packet.writeUInt32LE(unk2)
		packet.writeUInt8(type)
		packet.writeBuffer(remaining) // TODO
		return packet.data.toBuffer()
	}
}