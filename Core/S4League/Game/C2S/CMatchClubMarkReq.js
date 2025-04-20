var Packet = require('../../../Network/Packet')

// TODO: Not sure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(clanId) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		return packet.data.toBuffer()
	}
}