var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function (packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			data: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function (accountId, data) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeBuffer(data)
		return packet.data.toBuffer()
	}
}
/*
module.exports = {
	deserialize: function (packet) {
		var deserialized = {
			accountId: packet.readUInt64LE(),
			unk: packet.readBuffer(88),
			encrypted: packet.readBuffer(424)
		}

		return deserialized
	},
	serialize: function (accountId, unk, encrypted) {
		var packet = new Packet()
		packet.writeUInt64LE(accountId)
		packet.writeBuffer(unk)
		packet.writeBuffer(encrypted)
		return packet.data.toBuffer()
	}
}
*/
