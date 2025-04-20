var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			traceId: packet.readUInt8(), // TraceId
			text: packet.readProudString()
		}

		return deserialized
	},
	serialize: function(traceId, text) {
		var packet = new Packet('E')
		packet.writeUInt8(traceId) // TraceId
		packet.writeProudString(text)
		return packet.data.toBuffer()
	}
}