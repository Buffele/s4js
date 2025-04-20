var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			rule: packet.readUInt32LE(),
			map: packet.readUInt8(),
			playerLimit: packet.readUInt8(),
			scoreLimit: packet.readUInt16LE(),
			unk1: packet.readUInt32LE(),
			timeLimit: packet.readUInt8() * (60 * 1000),
			weaponLimit: packet.readUInt32LE(),
			pw: packet.readProudString(),
			name: packet.readProudString(),
			observers: packet.readUInt8(),
			observerLimit: packet.readUInt8(),
			unk2: packet.readBuffer(5),
			missionId: packet.readUInt32LE(),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(rule, map, playerLimit, scoreLimit, unk1, timeLimit, weaponLimit, password, name, observers, observerLimit, unk2, missionId, unk3) {
		var packet = new Packet()
		packet.writeUInt32LE(rule)
		packet.writeUInt8(map)
		packet.writeUInt8(playerLimit)
		packet.writeUInt16LE(scoreLimit)
		packet.writeUInt32LE(unk1)
		packet.writeUInt8(timeLimit / (60 * 1000))
		packet.writeUInt32LE(weaponLimit)
		packet.writeProudString(password)
		packet.writeProudString(name)
		packet.writeUInt8(observers)
		packet.writeUInt8(observerLimit)
		packet.writeBuffer(unk2)
		packet.writeUInt32LE(missionId)
		packet.writeUInt8(unk3)
		return packet.data.toBuffer()
	}
}