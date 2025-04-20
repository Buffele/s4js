var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			murderPlayerId: packet.readUInt32LE(),
			unk1: packet.readUInt16LE(),
			murderPeerId: new PeerId(packet.readUInt16LE()),
			murderAssistPlayerId: packet.readUInt32LE(),
			unk2: packet.readUInt16LE(),
			murderAssistPeerId: new PeerId(packet.readUInt16LE()),
			weaponId: packet.readUInt32LE(),
			victimPlayerId: packet.readUInt32LE(),
			unk3: packet.readUInt16LE(),
			victimPeerId: new PeerId(packet.readUInt16LE())
		}

		return deserialized
	},
	serialize: function(murderPlayerId, unk1, murderPeerId, murderAssistPlayerId, unk2, murderAssistPeerId, weaponId, victimPlayerId, unk3, victimPeerId) {
		var packet = new Packet()
		packet.writeUInt32LE(murderPlayerId)
		packet.writeUInt16LE(unk1)
		packet.writeUInt16LE(murderPeerId.getValue())
		packet.writeUInt32LE(murderAssistPlayerId)
		packet.writeUInt16LE(unk2)
		packet.writeUInt16LE(murderAssistPeerId.getValue())
		packet.writeUInt32LE(weaponId)
		packet.writeUInt32LE(victimPlayerId)
		packet.writeUInt16LE(unk3)
		packet.writeUInt16LE(victimPeerId.getValue())
		return packet.data.toBuffer()
	}
}