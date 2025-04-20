var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			activityArea: packet.readUInt32LE(),
			activityPurpose: packet.readUInt32LE(),
			introduction: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(activityArea, activityPurpose, introduction) {
		var packet = new Packet()
		packet.writeUInt32LE(activityArea)
		packet.writeUInt32LE(activityPurpose)
		packet.writeProudString(introduction)
		return packet.data.toBuffer()
	}
}