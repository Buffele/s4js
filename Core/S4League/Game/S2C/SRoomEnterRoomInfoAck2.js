var GameRandom = require('../Constants/GameRandom')
var GameRule = require('../Constants/GameRule')
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
			unk2: packet.readUInt32LE(), // time sync?
			scoreLimit: packet.readUInt8(),
			unk3: packet.readUInt32LE(),
			relayIp: packet.readProudString(),
			relayPort: packet.readUInt16LE(),
			unk4: packet.readUInt8(),
			unk5: packet.readUInt32LE(),
			settings: packet.readUInt32LE(),
			randomRule: packet.readUInt32LE(),
			randomMap: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(room, relay) {
		var packet = new Packet()
		packet.writeUInt32LE(room.id)
		packet.writeUInt32LE(room.random === GameRandom.RuleAndMap ? GameRule.Random : room.rule)
		packet.writeUInt8(room.map)
		packet.writeUInt8(room.playerLimit)
		packet.writeUInt32LE(room.state)
		packet.writeUInt32LE(room.subState)
		packet.writeUInt32LE(room.timeLimit)
		packet.writeUInt32LE(0) // unk1
		packet.writeUInt32LE(0) // unk2 | time sync?
		packet.writeUInt8(room.scoreLimit)
		packet.writeUInt32LE(0) // unk3
		packet.writeProudString(relay.ip)
		packet.writeUInt16LE(relay.port)
		packet.writeUInt8(1) // unk4
		// unk5
		if(room.random === GameRandom.RuleAndMap) {
			packet.writeUInt8(0x34) // unk char
			packet.writeUInt8(0xfa) // unk char
			packet.writeUInt8(0xaf) // unk char
			packet.writeUInt8(0x09) // unk char
		} else {
			packet.writeUInt8(0xa8) // unk char
			packet.writeUInt8(0xf6) // unk char
			packet.writeUInt8(0x29) // unk char
			packet.writeUInt8(0x0a) // unk char
		}
		packet.writeUInt32LE(room.settings)
		packet.writeUInt32LE(room.random === GameRandom.RuleAndMap ? room.rule : 0)
		packet.writeUInt8(room.random === GameRandom.RuleAndMap || room.random === GameRandom.Map ? room.map : 0)
		return packet.data.toBuffer()
	}
}