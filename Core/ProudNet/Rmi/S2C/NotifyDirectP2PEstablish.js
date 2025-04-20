var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			a0: packet.readUInt32LE(), // hostId
			b0: packet.readUInt32LE(), // hostId
			//IPEndPoint x0,
			//IPEndPoint y0,
			//IPEndPoint z0,
			//IPEndPoint w0
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(a0, b0, x0, y0, z0, w0) {
		var packet = new Packet('E')
		packet.writeUInt32LE(a0) // hostId
		packet.writeUInt32LE(b0) // hostId
		//IPEndPoint x0,
		//IPEndPoint y0,
		//IPEndPoint z0,
		//IPEndPoint w0
		return packet.data.toBuffer()
	}
}