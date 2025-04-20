var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

// TODO: Needs check
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			hosts: [],
			data: null
		}

		var hostCount = packet.readProudSize()
		for (var i = 0; i < hostCount; i++) {
			deserialized.hosts.push({
				hostId: packet.readUInt32LE(),
				frameNumber: packet.readUInt32LE()
			})
		}

		deserialized.data = packet.readProudBuffer()

		return deserialized
	},
	serialize: function(hosts, data) {
		var packet = new Packet(OPCode.ReliableRelay1)
		packet.writeProudSize(hosts.length)
		for (var i = 0; i < hosts.length; i++) {
			var host = hosts[i]
			packet.writeUInt32LE(host.hostId)
			packet.writeUInt32LE(host.frameNumber)
		}
		packet.writeProudBuffer(data)
		return packet.finalize()
	}
}