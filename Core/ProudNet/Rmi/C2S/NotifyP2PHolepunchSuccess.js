var Packet = require('../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			a: packet.readUInt32LE(),
			b: packet.readUInt32LE(),
			// TODO
			//IPEndPoint ABSendAddr,
			//IPEndPoint ABRecvAddr,
			//IPEndPoint BASendAddr,
			//IPEndPoint BARecvAddr,
			remaining: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(a, b, remaining) {
		var packet = new Packet('E')
		packet.writeUInt32LE(a)
		packet.writeUInt32LE(b)
		// TODO
		//IPEndPoint ABSendAddr,
		//IPEndPoint ABRecvAddr,
		//IPEndPoint BASendAddr,
		//IPEndPoint BARecvAddr,
		packet.writeBuffer(remaining)
		return packet.data.toBuffer()
	}
}