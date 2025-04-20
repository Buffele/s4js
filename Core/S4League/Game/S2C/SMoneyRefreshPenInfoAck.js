var Packet = require('../../../Network/Packet')

/*
Used for:
- CMoneyUseCoinReq
- CGameKickOutRequestReq
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			pen: packet.readUInt32LE()
		}

		return deserialized
	},
	serialize: function(pen) {
		var packet = new Packet()
		packet.writeUInt32LE(pen)
		return packet.data.toBuffer()
	}
}