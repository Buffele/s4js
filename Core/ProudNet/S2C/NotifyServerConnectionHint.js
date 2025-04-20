var OPCode = require('../Constants/OPCode')
var Packet = require('../Network/Packet')

module.exports = {
	deserialize: function(packet) {
		var deserialized = {
			settings: {
				enableServerLog: packet.readUInt8(),
				fallback: packet.readUInt8(), // FallbackMethod
				messageMaxLength: packet.readUInt32LE(),
				timeoutTimeMs: packet.readDoubleLE(),
				p2pStartCondition: packet.readUInt8(), // DirectP2PStartCondition
				overSendSuspectingThresholdInBytes: packet.readUInt32LE(),
				enableNagleAlgorithm: packet.readUInt8(),
				encryptedMessageKeyLength: packet.readUInt32LE(),
				fastEncryptedMessageKeyLength: packet.readUInt32LE(),
				allowServerAsP2PGroupMember: packet.readUInt8(),
				enableP2PEncryptedMessaging: packet.readUInt8(),
				upnpDetectNatDevice: packet.readUInt8(),
				upnpTcpAddrPortMapping: packet.readUInt8(),
				enableLookaheadP2PSend: packet.readUInt8(),
				enablePingTest: packet.readUInt8(),
				emergencyLogLineCount: packet.readUInt32LE()
			},
			key: packet.readProudBuffer()
		}

		return deserialized
	},
	serialize: function(self) {
		var packet = new Packet(OPCode.NotifyServerConnectionHint)
		packet.writeUInt8(self.enableServerLog)
		packet.writeUInt8(self.fallbackMethod)
		packet.writeUInt32LE(self.messageMaxLength)
		packet.writeDoubleLE(self.timeoutTimeMs)
		packet.writeUInt8(self.directP2PStartCondition)
		packet.writeUInt32LE(self.overSendSuspectingThresholdInBytes)
		packet.writeUInt8(self.enableNagleAlgorithm)
		packet.writeUInt32LE(self.encryptedMessageKeyLength)
		packet.writeUInt32LE(self.fastEncryptedMessageKeyLength)
		packet.writeUInt8(self.allowServerAsP2PGroupMember)
		packet.writeUInt8(self.enableP2PEncryptedMessaging)
		packet.writeUInt8(self.upnpDetectNatDevice)
		packet.writeUInt8(self.upnpTcpAddrPortMapping)
		packet.writeUInt8(self.enableLookaheadP2PSend)
		packet.writeUInt8(self.enablePingTest)
		packet.writeUInt32LE(self.emergencyLogLineCount)
		packet.writeProudBuffer(self.publicKey)
		return packet.finalize()
	}
}