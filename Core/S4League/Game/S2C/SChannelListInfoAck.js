var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			channels: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.channels.push({
				id: packet.readUInt16LE(),
				playersOnline: packet.readUInt16LE(),
				playerLimit: packet.readUInt16LE(),
				channelType: packet.readUInt16LE(),
				unk: packet.readUInt16LE(),
				name: packet.readProudString(),
				rank: packet.readProudString(),
				description: packet.readProudString(),
				color: {
					b: packet.readUInt8(),
					g: packet.readUInt8(),
					r: packet.readUInt8(),
					a: packet.readUInt8()
				},
				minLevel: packet.readUInt32LE(),
				maxLevel: packet.readUInt32LE(),
				minRequireKDRate: packet.readFloatLE(),
				maxRequireKDRate: packet.readFloatLE()
			})
		}

		return deserialized
	},
	serialize: function(channels) {
		var packet = new Packet()
		packet.writeUInt32LE(channels.length)
		for (i = 0; i < channels.length; i++) {
			var channel = channels[i]
			packet.writeUInt16LE(channel.id)
			packet.writeUInt16LE(channel.playersOnline)
			packet.writeUInt16LE(channel.playerLimit)
			packet.writeUInt16LE(channel.channelType)
			packet.writeUInt16LE(0) // unk
			packet.writeProudString(channel.name)
			packet.writeProudString(channel.rank)
			packet.writeProudString(channel.description)
			packet.writeUInt8(channel.color.b)
			packet.writeUInt8(channel.color.g)
			packet.writeUInt8(channel.color.r)
			packet.writeUInt8(channel.color.a)
			packet.writeUInt32LE(channel.minLevel)
			packet.writeUInt32LE(channel.maxLevel)
			packet.writeFloatLE(channel.minRequireKDRate)
			packet.writeFloatLE(channel.maxRequireKDRate)
		}
		return packet.data.toBuffer()
	}
}