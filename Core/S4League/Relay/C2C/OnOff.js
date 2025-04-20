var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			action: packet.readInt8(),
			isEnabled: packet.readInt8(),
			value: packet.readInt8()
		}

		return deserialized
	},
	serialize: function(action, isEnabled, value) {
		var packet = new Packet()
		packet.writeInt8(action)
		packet.writeInt8(isEnabled)
		packet.writeInt8(value)
		return packet.data.toBuffer()
	}
}