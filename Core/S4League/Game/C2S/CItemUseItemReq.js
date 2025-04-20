var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			type: packet.readUInt8(),
			charSlot: packet.readUInt8(),
			eqSlot: packet.readUInt8(),
			id: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(type, charSlot, eqSlot, id) {
		var packet = new Packet()
		packet.writeUInt8(type)
		packet.writeUInt8(charSlot)
		packet.writeUInt8(eqSlot)
		packet.writeUInt64LE(id)
		return packet.data.toBuffer()
	}
}