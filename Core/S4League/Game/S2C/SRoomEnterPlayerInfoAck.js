var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			clanId: packet.readUInt32LE(),
			playerId: packet.readUInt64LE(),
			unk1: packet.readUInt8(),
			clanName: packet.readProudString(),
			unk2: packet.readUInt16LE()
		}

		return deserialized
	},
	serialize: function(clanId, playerId, clanName) {
		var packet = new Packet()
		packet.writeUInt32LE(clanId)
		packet.writeUInt64LE(playerId)
		packet.writeUInt8(1) // unk1
		packet.writeProudString(clanName)
		packet.writeUInt16LE(32) // unk2 | Peer ID? Could be possible because we broadcast this to the other players ;)
		return packet.data.toBuffer()
	}
}