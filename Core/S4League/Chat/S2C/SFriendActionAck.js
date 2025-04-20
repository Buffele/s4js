var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			unk1: packet.readUInt32LE(), // TODO: result?
			result: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			name: packet.readProudString(),
			action: packet.readUInt32LE(),
			unk2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(remove, accountId, name) {
		var action
		if(remove) {
			action = 4
		} else {
			action = 5
		}

		var packet = new Packet()
		packet.writeUInt32LE(0) // unk1 | TODO: result?
		packet.writeUInt32LE(1) // Result: 1 -> Ok, 3 -> failed
		packet.writeUInt64LE(accountId)
		packet.writeProudString(name)
		packet.writeUInt32LE(action) // 5 -> Add, 4 -> Remove
		packet.writeUInt32LE(0) // unk2
		return packet.data.toBuffer()
	}
}