var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(clanId, unk) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt32LE(unk)
		return packet.data.toBuffer()
	}
}