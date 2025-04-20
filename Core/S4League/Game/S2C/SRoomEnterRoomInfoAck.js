var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt32LE(),
			rule: packet.readUInt32LE(),
			map: packet.readUInt8(),
			playerLimit: packet.readUInt8(),
			state: packet.readUInt32LE(),
			subState: packet.readUInt32LE(),
			timeLimit: packet.readUInt32LE(),
			unk1: packet.readUInt32LE(),
			unk2: packet.readUInt32LE(),
			scoreLimit: packet.readUInt8(),
			unk3: packet.readUInt32LE(),
			relayIp: packet.readProudString(),
			relayPort: packet.readUInt16LE(),
			unk4: packet.readUInt8(),
			missionId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(room, relay) {
		var packet = new Packet()
		packet.writeUInt32LE(room.id)
		packet.writeUInt32LE(room.rule)
		packet.writeUInt8(room.map)
		packet.writeUInt8(room.playerLimit)
		packet.writeUInt32LE(room.state)
		packet.writeUInt32LE(room.subState)
		packet.writeUInt32LE(room.timeLimit)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(0) // unk2 | time sync
		packet.writeUInt8(room.scoreLimit)
		packet.writeUInt32LE(0) // unk3
		packet.writeProudString(relay.ip)
		packet.writeUInt16LE(relay.port)
		packet.writeUInt8(1) // unk4
		packet.writeUInt32LE(room.missionId)
		return packet.data.toBuffer()
	}
}