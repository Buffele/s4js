var Packet = require('../../../Network/Packet')

// TODO: Get the Structure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			data: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(data/*event, id, unk1, unk2, str*/) {
		var packet = new Packet()
		packet.writeBuffer(data)
		/*
		packet.writeUInt8(event)
		packet.writeUInt64LE(id)
		packet.writeUInt32LE(unk1)
		packet.writeUInt16LE(unk2)
		packet.writeUInt8(0x01)
		packet.writeProudBuffer(Buffer.from(str))
		*/
		return packet.data.toBuffer()
	}
}