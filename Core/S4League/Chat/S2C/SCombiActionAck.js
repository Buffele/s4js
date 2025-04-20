var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			result: packet.readUInt32LE(), // TODO: Result?
			action: packet.readUInt32LE(),
			accountId: packet.readUInt64LE(),
			unk2: packet.readUInt32LE(),
			type: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			unk7: packet.readUInt32LE(),
			matches: packet.readUInt64LE(),
			win: packet.readUInt64LE(),
			lose: packet.readUInt64LE(),
			unkString: packet.readProudString(),
			playerName: packet.readProudString(),
			name: packet.readProudString(),
			creationDate: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(remove, accountId, name, combiName) {
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
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(1) // type
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(0) // unk4 (EXP?)
		packet.writeUInt32LE(0) // unk5
		packet.writeUInt32LE(0) // unk6
		packet.writeUInt32LE(0) // unk7
		packet.writeUInt64LE(0) // matches
		packet.writeUInt64LE(0) // win
		packet.writeUInt64LE(0) // lose
		packet.writeProudString('') // unkString
		packet.writeProudString(name)
		packet.writeProudString(combiName)
		packet.writeProudString('20150502130756') // creationDate
		return packet.data.toBuffer()
	}
}