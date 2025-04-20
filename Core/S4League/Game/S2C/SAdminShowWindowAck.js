var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			enabled: +!packet.readUInt8()
		}

		return deserialized
	},
	serialize: function(/*enabled*/) {
		var packet = new Packet()
		packet.writeUInt8(/*+!enabled*/0) // 1 -> disabled, 0 -> enabled
		return packet.data.toBuffer()
	}
}