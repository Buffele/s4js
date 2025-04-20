var Packet = require('../../../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			access: packet.readUInt32LE(), // 0 -> All, 1 -> Only Clan Members can enter Clan Board., 2 -> Only our Clan Members can enter Clan Board.
			postRight: packet.readUInt32LE(), // 0 -> All, 1 -> Only Clan Members can enter Clan Board., 2 -> Only our Clan Members can enter Clan Board.
			badMannerRejectedAccess: packet.readUInt32LE(), // 1 -> Yes, 0 -> No
			badMannerRejectedPost: packet.readUInt32LE() // 1 -> Yes, 0 -> No
		}

		return deserialized
	},
	serialize: function(access, postRight, badMannerRejectedAccess, badMannerRejectedPost) {
		var packet = new Packet()
		packet.writeUInt32LE(access)
		packet.writeUInt32LE(postRight)
		packet.writeUInt32LE(badMannerRejectedAccess)
		packet.writeUInt32LE(badMannerRejectedPost)
		return packet.data.toBuffer()
	}
}