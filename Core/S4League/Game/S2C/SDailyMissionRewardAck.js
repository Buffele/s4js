var Packet = require('../../../Network/Packet')

// This is wrong...
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			missionId: packet.readUInt32LE(),
			result: packet.readUInt32LE(),
			unk: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(missionId, result, unk) {
		var packet = new Packet()
		packet.writeUInt32LE(missionId)
		packet.writeUInt32LE(result)
		packet.writeUInt32LE(unk)
		return packet.data.toBuffer()
	}
}