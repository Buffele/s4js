var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			rule: packet.readUInt32LE(),
			map: packet.readUInt8(),
			playerLimit: packet.readUInt8(),
			scoreLimit: packet.readUInt16LE(),
			timeLimit: packet.readUInt8() * (60 * 1000),
			weaponLimit: packet.readUInt32LE(),
			name: packet.readProudString(),
			pw: packet.readProudString(),
			observers: packet.readUInt8(),
			observerLimit: packet.readUInt8(),
			unk1: packet.readBuffer(10),
			random: packet.readUInt32LE(),
			settings: packet.readUInt32LE(),
			unk2: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(rule, map, playerLimit, scoreLimit, timeLimit, weaponLimit, name, pw, observers, observerLimit, unk1, random, settings) {
		var packet = new Packet()
		packet.writeUInt32LE(rule)
		packet.writeUInt8(map)
		packet.writeUInt8(playerLimit)
		packet.writeUInt16LE(scoreLimit)
		packet.writeUInt8((timeLimit / (60 * 1000)))
		packet.writeUInt32LE(weaponLimit)
		packet.writeProudString(name)
		packet.writeProudString(pw)
		packet.writeUInt8(observers)
		packet.writeUInt8(observerLimit)
		packet.writeBuffer(unk1)
		packet.writeUInt32LE(random)
		packet.writeUInt32LE(settings)
		packet.writeUInt32LE(0) // unk2
		return packet.data.toBuffer()
	}
}