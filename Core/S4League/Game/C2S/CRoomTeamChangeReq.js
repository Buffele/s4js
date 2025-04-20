var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			team: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(team) {
		var packet = new Packet()
		packet.writeUInt8(team)
		return packet.data.toBuffer()
	}
}