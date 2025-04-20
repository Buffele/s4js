var Packet = require('../../../Network/Packet')
var Common = require('../../Constants/Common')
var HashUtil = require('../../HashUtil')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {}

		deserialized.uiCodePage = packet.readUInt32LE();
		deserialized.strPlayerName = packet.readProudString();
		var vtrVersionSz = packet.readUInt32LE();
		deserialized.vtrVersion = [];
		for (var i = 0; i < vtrVersionSz; i++) {
			deserialized.vtrVersion.push(packet.readUInt16LE());
		}
		deserialized.uiAccountInfo = packet.readUInt32LE();
		deserialized.ulSerial = packet.readUInt32LE();
		deserialized.ulTimeStamp = packet.readUInt32LE();
		deserialized.strHash = packet.readProudString();
		deserialized.strPCBID = packet.readProudString();
		deserialized.isLoginPlayerLeave = packet.readUInt8();
		deserialized.strShutDown = packet.readProudString();
		deserialized.uiUserType = packet.readUInt32LE();
		deserialized.strAccessCode = packet.readProudString();
		deserialized.strAccessToken = packet.readProudString();
		deserialized.strRefreshToken = packet.readProudString();
		deserialized.strExpireTime = packet.readProudString();

		return deserialized
	},
	serialize: function(req) {
		var packet = new Packet()

		packet.writeUInt32LE(req.uiCodePage);
		packet.writeProudString(req.strPlayerName);
		packet.writeUInt32LE(req.vtrVersion.length)
		for (var i = 0; i < req.vtrVersion.length; i++) {
			packet.writeUInt16LE(req.vtrVersion[i])
		}
		packet.writeUInt32LE(req.uiAccountInfo);
		packet.writeUInt32LE(req.ulSerial);
		packet.writeUInt32LE(req.ulTimeStamp);
		packet.writeProudString(req.strHash);
		packet.writeProudString(req.strPCBID);
		packet.writeUInt8(req.isLoginPlayerLeave);
		packet.writeProudString(req.strShutDown);
		packet.writeUInt32LE(req.uiUserType);
		packet.writeProudString(req.strAccessCode);
		packet.writeProudString(req.strAccessToken);
		packet.writeProudString(req.strRefreshToken);
		packet.writeProudString(req.strExpireTime);

		return packet.data.toBuffer()
	}
}
