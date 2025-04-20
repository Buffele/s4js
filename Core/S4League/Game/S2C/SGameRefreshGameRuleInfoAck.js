var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			state: packet.readUInt32LE(),
			subState: packet.readUInt32LE(),
			timePassed: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(state, subState, timePassed) {
		var packet = new Packet()
		packet.writeUInt32LE(state)
		packet.writeUInt32LE(subState)
		packet.writeUInt32LE(timePassed)
		return packet.data.toBuffer()
	}
}