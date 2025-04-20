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
			password: packet.readProudString(),
			name: packet.readProudString(),
			observers: packet.readUInt8(),
			observerLimit: packet.readUInt8(),
			unk2: packet.readBuffer(5),
			missionId: packet.readUInt32LE(),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(room) {
		var packet = new Packet()
		packet.writeUInt32LE(room.rule)
		packet.writeUInt8(room.map)
		packet.writeUInt8(room.playerLimit)
		packet.writeUInt16LE(room.scoreLimit)
		packet.writeUInt32LE(room.unk1)
		packet.writeUInt8(room.timeLimit / (60 * 1000))
		packet.writeUInt32LE(room.weaponLimit)
		packet.writeProudString(room.pw)
		packet.writeProudString(room.name)
		packet.writeUInt8(room.observers)
		packet.writeUInt8(room.observerLimit)
		packet.writeBuffer(room.unk2)
		packet.writeUInt32LE(room.missionId)
		packet.writeUInt8(room.unk3)
		return packet.data.toBuffer()
	}
}