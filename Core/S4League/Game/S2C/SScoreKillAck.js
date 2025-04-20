var Packet = require('../../../Network/Packet')
var PeerId = require('../../PeerId')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			murderPlayerId: packet.readUInt32LE(),
			unk1: packet.readUInt16LE(),
			murderPeerId: new PeerId(packet.readUInt16LE()),
			weaponId: packet.readUInt32LE(),
			victimPlayerId: packet.readUInt32LE(),
			unk2: packet.readUInt16LE(),
			victimPeerId: new PeerId(packet.readUInt16LE()),
			unk3: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(murderPlayerId, unk1, murderPeerId, weaponId, victimPlayerId, unk2, victimPeerId, unk3) {
		var packet = new Packet()
		packet.writeUInt32LE(murderPlayerId)
		packet.writeUInt16LE(unk1)
		packet.writeUInt16LE(murderPeerId.getValue())
		packet.writeUInt32LE(weaponId)
		packet.writeUInt32LE(victimPlayerId)
		packet.writeUInt16LE(unk2)
		packet.writeUInt16LE(victimPeerId.getValue())
		packet.writeUInt8(unk3)
		return packet.data.toBuffer()
	}
}