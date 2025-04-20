var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			allowCombi: packet.readInt32LE(),
			allowFriendRequest: packet.readInt32LE(),
			allowInvitation: packet.readInt32LE(),
			allowOpenInfo: packet.readInt32LE()
		}

		return deserialized
	},
	serialize: function(allowCombi, allowFriendRequest, allowInvitation, allowOpenInfo) {
		var packet = new Packet()
		packet.writeInt32LE(allowCombi)
		packet.writeInt32LE(allowFriendRequest)
		packet.writeInt32LE(allowInvitation)
		packet.writeInt32LE(allowOpenInfo)
		return packet.data.toBuffer()
	}
}