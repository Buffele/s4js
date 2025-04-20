var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			id: packet.readUInt8(),
			state: packet.readUInt8(),
			mode: packet.readUInt32LE(),
			map: packet.readUInt8(),
			playerIn: packet.readUInt8(),
			playerLimit: packet.readUInt8(),
			weaponLimit: packet.readUInt32LE(),
			password: packet.readProudString(),
			name: packet.readProudString(),
			observers: packet.readUInt8(),
			observerLimit: packet.readUInt8(),
			random: packet.readUInt32LE(),
			settings: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(room) {
		var packet = new Packet()
		packet.writeUInt8(room.id)
		packet.writeUInt8(room.state)
		packet.writeUInt32LE(room.mode)
		packet.writeUInt8(room.map)
		packet.writeUInt8(room.playerIn)
		packet.writeUInt8(room.playerLimit)
		packet.writeUInt32LE(room.weaponLimit)
		packet.writeProudString(room.pw)
		packet.writeProudString(room.name)
		packet.writeUInt8(room.observers)
		packet.writeUInt8(room.observerLimit)
		packet.writeUInt32LE(room.random)
		packet.writeUInt32LE(room.settings)
		return packet.data.toBuffer()
	}
}