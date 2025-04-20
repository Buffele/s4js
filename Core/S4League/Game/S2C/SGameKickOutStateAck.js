var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			yVotes: packet.readUInt32LE(),
			nVotes: packet.readUInt32LE(),
			totalVoters: packet.readUInt32LE(),
			reason: packet.readUInt8(),
			startPlayerId: packet.readUInt64LE(),
			kickPlayerId: packet.readUInt64LE()
		}

		return deserialized
	},
	serialize: function(yVotes, nVotes, totalVoters, reason, startPlayerId, kickPlayerId) {
		var packet = new Packet()
		packet.writeUInt32LE(yVotes)
		packet.writeUInt32LE(nVotes)
		packet.writeUInt32LE(totalVoters)
		packet.writeUInt8(reason)
		packet.writeUInt64LE(startPlayerId)
		packet.writeUInt64LE(kickPlayerId)
		return packet.data.toBuffer()
	}
}