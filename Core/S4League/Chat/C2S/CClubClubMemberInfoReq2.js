var Packet = require('../../../Network/Packet')

module.exports = {
	/*
	Type:
	2: Clan
	3: No Clan
	*/
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			type: packet.readUInt32LE(),
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(clanId, type, unk) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt32LE(type)
		packet.writeUInt32LE(unk)
		return packet.data.toBuffer()
	}
}