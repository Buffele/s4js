var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			rmiId: packet.readUInt16LE(),
			data: packet.readRemaining()
		}

		return deserialized
	},
	serialize: function(rmiId, data) {
		var packet = new Packet(OPCode.Rmi)
		packet.writeUInt16LE(rmiId)
		if(data) {
			packet.writeBuffer(data)
		}
		return packet.finalize()
	}
}