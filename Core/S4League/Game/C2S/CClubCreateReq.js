var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			markId: packet.readProudString(),
			name: packet.readProudString(),
			description: packet.readProudString(),
			activityArea: packet.readUInt32LE(),
			activityPurpose: packet.readUInt32LE(),
			question1: packet.readProudString(),
			question2: packet.readProudString(),
			question3: packet.readProudString(),
			question4: packet.readProudString(),
			question5: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(markId, name, description, activityArea, activityPurpose, question1, question2, question3, question4, question5) {
		var packet = new Packet()
		packet.writeProudString(markId)
		packet.writeProudString(name)
		packet.writeProudString(description)
		packet.writeUInt32LE(activityArea)
		packet.writeUInt32LE(activityPurpose)
		packet.writeProudString(question1)
		packet.writeProudString(question2)
		packet.writeProudString(question3)
		packet.writeProudString(question4)
		packet.writeProudString(question5)
		return packet.data.toBuffer()
	}
}