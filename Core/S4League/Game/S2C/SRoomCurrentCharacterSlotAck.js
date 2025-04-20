var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			serverTime: packet.readUInt32LE(),
			slot: packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(serverTime, slot) {
		var packet = new Packet()
		packet.writeUInt32LE(serverTime)
		packet.writeUInt8(slot)
		return packet.data.toBuffer()
	}
}