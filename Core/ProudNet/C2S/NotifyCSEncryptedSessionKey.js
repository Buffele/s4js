var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			sessionKeyEncrypted: packet.readProudBuffer(),
			fastEncryptKeyEncrypted: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(sessionKeyEncrypted, fastEncryptKeyEncrypted) {
		var packet = new Packet(OPCode.NotifyCSEncryptedSessionKey)
		packet.writeProudBuffer(sessionKeyEncrypted) // encryptedAESKey
		packet.writeProudBuffer(fastEncryptKeyEncrypted) // encryptedRC4Key
		return packet.finalize()
	}
}