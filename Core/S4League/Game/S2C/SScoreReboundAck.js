var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			newPlayerId: packet.readUInt32LE(),
			unk1: packet.readUInt16LE(),
			newPlayerPeerId: new PeerId(packet.readUInt16LE()),
			oldPlayerId: packet.readUInt32LE(),
			unk2: packet.readUInt16LE(),
			oldPlayerPeerId: new PeerId(packet.readUInt16LE())
		}

		return deserialized
	},
	serialize: function(newPlayerId, unk1, newPlayerPeerId, oldPlayerId, unk2, oldPlayerPeerId) {
		var packet = new Packet()
		packet.writeUInt32LE(newPlayerId)
		packet.writeUInt16LE(unk1)
		packet.writeUInt16LE(newPlayerPeerId.getValue())
		packet.writeUInt32LE(oldPlayerId)
		packet.writeUInt16LE(unk2)
		packet.writeUInt16LE(oldPlayerPeerId.getValue())
		return packet.data.toBuffer()
	}
}