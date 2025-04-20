var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			master: {
				name: packet.readProudString(),
				level: packet.readUInt32LE(),
				clan: {
					markId: packet.readProudString()
				}
			},
			unk1: packet.readUInt8(),
			scoreLimit: packet.readUInt32LE(),
			timeLimit: packet.readUInt32LE(),
			state: packet.readUInt32LE(),
			subState: packet.readUInt32LE(),
			numAlpha: packet.readUInt32LE(),
			numBeta: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			unk3: packet.readUInt32LE(),
			unk4: packet.readUInt32LE(),
			unk5: packet.readUInt32LE(),
			unk6: packet.readUInt32LE(),
			random: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(room, numAlpha, numBeta) {
		var packet = new Packet()
		packet.writeProudString(room.master.name)
		packet.writeUInt32LE(room.master.level)
		packet.writeProudString(room.master.clan.markId)
		packet.writeUInt8(0) // unk1
		packet.writeUInt32LE(room.scoreLimit)
		packet.writeUInt32LE(room.timeLimit)
		packet.writeUInt32LE(room.state)
		packet.writeUInt32LE(room.subState)
		packet.writeUInt32LE(numAlpha)
		packet.writeUInt32LE(numBeta)
		packet.writeUInt32LE(0) // unk2
		packet.writeUInt32LE(0) // unk3
		packet.writeUInt32LE(0) // unk4
		packet.writeUInt32LE(0) // unk5
		packet.writeUInt32LE(0) // unk6
		packet.writeUInt32LE(room.random)
		return packet.data.toBuffer()
	}
}