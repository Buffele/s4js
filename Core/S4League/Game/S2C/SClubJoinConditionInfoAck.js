var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			joinType: packet.readUInt32LE(),
			minimumJoinLevel: packet.readUInt32LE(),
			question1: packet.readProudString(),
			question2: packet.readProudString(),
			question3: packet.readProudString(),
			question4: packet.readProudString(),
			question5: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(/*joinType, minimumJoinLevel, question1, question2, question3, question4, question5*/) {
		var packet = new Packet()
		packet.writeUInt32LE(/*joinType*/1)
		packet.writeUInt32LE(/*minimumJoinLevel*/5)
		packet.writeProudString(/*question1*/'A')
		packet.writeProudString(/*question2*/'B')
		packet.writeProudString(/*question3*/'C')
		packet.writeProudString(/*question4*/'D')
		packet.writeProudString(/*question5*/'E')
		return packet.data.toBuffer()
	}
}