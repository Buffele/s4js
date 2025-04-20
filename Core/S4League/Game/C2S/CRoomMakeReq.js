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
			unk1: packet.readBuffer(7),
			missionId: packet.readUInt32LE(),
			unk2: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(rule, map, playerLimit, scoreLimit, timeLimit, weaponLimit, name, password, unk1, missionId, unk2) {
		var packet = new Packet()
		packet.writeUInt32LE(rule)
		packet.writeUInt8(map)
		packet.writeUInt8(playerLimit)
		packet.writeUInt16LE(scoreLimit)
		packet.writeUInt8(timeLimit / (60 * 1000))
		packet.writeUInt32LE(weaponLimit)
		packet.writeProudString(name)
		packet.writeProudString(password)
		packet.writeBuffer(unk1)
		packet.writeUInt32LE(missionId)
		packet.writeUInt8(unk2)
		return packet.data.toBuffer()
	}
}