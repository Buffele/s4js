var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			rule: packet.readUInt32LE(),
			map: packet.readUInt32LE(),
			weaponLimit: packet.readUInt16LE(),
			playerLimit: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(rule, map, weaponLimit, playerLimit) {
		var packet = new Packet()
		packet.writeUInt32LE(rule)
		packet.writeUInt32LE(map)
		packet.writeUInt16LE(weaponLimit)
		packet.writeUInt16LE(playerLimit)
		return packet.data.toBuffer()
	}
}