var Packet = require('../../../Network/Packet')

/*
* Activates Logging for the devs.
* Needs to be sent for every new room again.
* The following will be sent additionally to the Server:
* - CLogBeginResponseReq (After a complete Respawn)
*/
module.exports = {
	deserialize: function(packet) {
		var deserialized = {

		}

		return deserialized
	},
	serialize: function() {
		var packet = new Packet()
		return packet.data.toBuffer()
	}
}