var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

// TODO: Needs check
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			priority: packet.readUInt8(), // MessagePriority
			uniqueIdCounter: packet.readProudSize(),
			hostIds: [],
			data: null
		}

		var hostIdCount = packet.readProudSize()

		for (var i = 0; i < hostIdCount; i++) {
			deserialized.hostIds.push(packet.readUInt32LE())
		}

		deserialized.data = packet.readProudBuffer()

		return deserialized
	},
	serialize: function(priority, uniqueIdCounter, hostIds, data) {
		var packet = new Packet(OPCode.UnreliableRelay1)
		packet.writeUInt8(priority) // MessagePriority
		packet.writeProudSize(uniqueIdCounter)
		packet.writeProudSize(hostIds.length)
		for (var i = 0; i < hostIds.length; i++) {
			packet.writeUInt32LE(hostIds[i])
		}
		packet.writeProudBuffer(data)
		return packet.finalize()
	}
}