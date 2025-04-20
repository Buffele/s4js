var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			time: packet.readUInt32LE(),
			ts: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(time, ts) {
		var packet = new Packet()
		packet.writeUInt32LE(time)
		packet.writeUInt32LE(ts)
		return packet.data.toBuffer()
	}
}