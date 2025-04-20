var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			page: packet.readUInt8(),
			unk1: packet.readUInt8(),
			unk2: packet.readUInt8(),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(clanId, page, unk1, unk2, unk3) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt8(page)
		packet.writeUInt8(unk1)
		packet.writeUInt8(unk2)
		packet.writeUInt8(unk3)
		return packet.data.toBuffer()
	}
}