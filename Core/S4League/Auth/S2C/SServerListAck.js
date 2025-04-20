var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			servers: []
		}

		var length = packet.readUInt32LE()
		for (var i = 0; i < length; i++) {
			deserialized.servers.push({
				unk: packet.readUInt8(),
				id: packet.readUInt32LE(),
				type: packet.readUInt32LE(),
				name: packet.readProudString(),
				limit: packet.readUInt16LE(),
				online: packet.readUInt16LE(),
				ip: packet.readIp(),
				port: packet.readUInt16LE(),
				group: packet.readUInt16LE()
			})
		}

		return deserialized
	},
	serialize: function(servers) {
		var packet = new Packet()
		packet.writeUInt32LE(servers.length)
		for (var i = 0; i < servers.length; i++) {
			var server = servers[i]
			packet.writeUInt8(1) // unk
			packet.writeUInt32LE(server.id)
			packet.writeUInt32LE(server.type)
			packet.writeProudString(server.name)
			packet.writeUInt16LE(server.limit)
			packet.writeUInt16LE(server.online)
			packet.writeIp(server.ip)
			packet.writeUInt16LE(server.port)
			packet.writeUInt16LE(server.group)
		}
		return packet.data.toBuffer()
	}
}