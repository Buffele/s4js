var GameRuleState = require('../Constants/GameRuleState')
var Packet = require('../../../Network/Packet')

/*
Old Structure:
UInt32 count
	UInt8 id
	UInt8 isPlaying
	UInt32 rule
	UInt8 map
	UInt8 playerIn
	UInt8 playerLimit
	UInt32 weaponLimit
	String password
	String name
	UInt8 observers
	UInt8 observerLimit
	UInt32 random
	UInt32 settings
*/

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			rooms: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.rooms.push({
				id: packet.readUInt8(),
				isPlaying: packet.readUInt8(),
				rule: packet.readUInt32LE(),
				map: packet.readUInt8(),
				playerIn: packet.readUInt8(),
				playerLimit: packet.readUInt8(),
				weaponLimit: packet.readUInt32LE(),
				password: packet.readProudString(),
				name: packet.readProudString(),
				observers: packet.readUInt8(),
				observerLimit: packet.readUInt8(),
				random: packet.readUInt32LE(),
				settings: packet.readUInt32LE(),
				unk1: packet.readUInt32LE(),
				unk2: packet.readUInt32LE()
			})
		}

		return deserialized
	},
	serialize: function(rooms) {
		var packet = new Packet()
		packet.writeUInt32LE(rooms.length)
		for (i = 0; i < rooms.length; i++) {
			var room = rooms[i]
			packet.writeUInt8(room.id)
			packet.writeUInt8(room.state === GameRuleState.Playing ? 1 : 0)
			packet.writeUInt32LE(room.rule)
			packet.writeUInt8(room.map)
			packet.writeUInt8(room.players.length)
			packet.writeUInt8(room.playerLimit)
			packet.writeUInt32LE(room.weaponLimit)
			packet.writeProudString(room.pw)
			packet.writeProudString(room.name)
			packet.writeUInt8(room.observers)
			packet.writeUInt8(room.observerLimit)
			packet.writeUInt32LE(room.random)
			packet.writeUInt32LE(room.settings)
			packet.writeUInt32LE(0) // unk1
			packet.writeUInt32LE(0) // unk2
		}
		return packet.data.toBuffer()
	}
}