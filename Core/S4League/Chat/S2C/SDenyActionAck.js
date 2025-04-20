var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(), // TODO: result?
			action: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			name: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(remove, accountId, name) {
		var action
		if(remove) {
			action = 1
		} else {
			action = 0
		}

		var packet = new Packet()
		packet.writeUInt32LE(0) // TODO: result?
		packet.writeUInt32LE(action)
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		return packet.data.toBuffer()
	}
}