var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			pen: packet.readUInt32LE(),
			ap: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(/*pen, ap*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*pen*/1000000000)
		packet.writeUInt32LE(/*ap*/1000000000)
		return packet.data.toBuffer()
	}
}