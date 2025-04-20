var Packet = require('../../../Network/Packet')

// TODO: Check it with multiple chars
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			charSlot: packet.readUInt8(),
			eqSlot: packet.readUInt8(),
			id: packet.readUInt64LE(),
			type: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(charSlot, eqSlot, id, type) {
		var packet = new Packet()
		packet.writeUInt8(charSlot)
		packet.writeUInt8(eqSlot)
		packet.writeUInt64LE(id)
		packet.writeUInt8(type)
		return packet.data.toBuffer()
	}
}