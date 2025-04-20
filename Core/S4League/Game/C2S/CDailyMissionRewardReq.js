var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			missionId: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(missionId) {
		var packet = new Packet()
		packet.writeUInt32LE(missionId)
		return packet.data.toBuffer()
	}
}