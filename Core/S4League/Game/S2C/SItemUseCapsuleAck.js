var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			// TODO
		}

		return deserialized
	},
	serialize: function() {
		/*
		03 00 00 00
		02 00 00 00
		00 00 00 00

		81 8d 5b 00 itemId | 6000001
		01 00 00 00 shopId
		04 00 00 00 periodType
		02 00       period
		00 00 00 00 color
		00 00 00 00
		02 00 00 00
		00 00 00 00

		91 ab 1e 00 itemId | 2010001
		03 00 00 00 shopId
		03 00 00 00 periodType
		23 00       period
		00 00 00 86 color
		52 76 4d 00
		01 00 00 00
			e8 03 00 00
			00 00 00 00
			00 00 00 00
			00 00 00 00
			00 00 00 00
		00 00 00 00
		00 00 03
		*/

		var packet = new Packet()
		packet.writeUInt32LE(3)
		packet.writeUInt32LE(2)
		packet.writeUInt32LE(0)

		// 1
		packet.writeUInt32LE(6000001)
		packet.writeUInt32LE(1)
		packet.writeUInt32LE(4)
		packet.writeUInt16LE(2)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt32LE(2)
		packet.writeUInt32LE(0)

		// 2
		packet.writeUInt32LE(2010001)
		packet.writeUInt32LE(3)
		packet.writeUInt32LE(3)
		packet.writeUInt16LE(35)
		packet.writeUInt32LE(2248146944)
		packet.writeUInt32LE(5076562)
		packet.writeUInt32LE(1)
			packet.writeUInt32LE(1000)
			packet.writeUInt32LE(0)
			packet.writeUInt32LE(0)
			packet.writeUInt32LE(0)
			packet.writeUInt32LE(0)
		packet.writeUInt32LE(0)
		packet.writeUInt16LE(0)
		packet.writeUInt8(3)
		return packet.data.toBuffer()
	}
}