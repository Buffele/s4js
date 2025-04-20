var Packet = require('../../../Network/Packet')

// TODO: Reverse the Structure
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			// TODO
		}

		return deserialized
	},
	serialize: function() {
		/*
		28 2d de 00 00 00 00 00 07 00 00 00 a9 d7 53 00
		00 00 00 00 1b 84 d0 00 00 00 00 00 68 3e d3 00
		00 00 00 00 ca a8 d8 00 00 00 00 00 8e 43 de 00
		00 00 00 00 aa 58 de 00 00 00 00 00 e0 6a de 00
		00 00 00 00
		*/
		var packet = new Packet()
		// TODO
		packet.writeUInt64LE(1) // Player Id?
		return packet.data.toBuffer()
	}
}