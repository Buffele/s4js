var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			infos: []
		}

		var count = packet.readUInt32LE()
		for (var i = 0; i < count; i++) {
			deserialized.infos.push({
				// TODO: Don't know
			})
		}

		return deserialized
	},
	serialize: function(/*infos*/) {
		var infos = []

		var packet = new Packet()
		packet.writeUInt32LE(infos.length)
		for (var i = 0; i < infos.length; i++) {
			var info = infos[i]
			// TODO: Don't know
		}
		return packet.data.toBuffer()
	}
}