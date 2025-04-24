var crypto = require('crypto')
var dgram = require('dgram')
var events = require('events')
var net = require('net')
var util = require('util')
var zlib = require('zlib')

var CRC = require('../node_modules/crc')
var RSA = require('../node_modules/node-rsa')
var uuid = require('../node_modules/node-uuid')

var Logger = require('../Utils/Logger')
var Packet = require('./Network/Packet')

var Common = require('./Constants/Common')
var CompressMode = require('./Constants/CompressMode')
//var ConnectionState = require('./Constants/ConnectionState')
var DirectP2PStartCondition = require('./Constants/DirectP2PStartCondition')
var EncryptMode = require('./Constants/EncryptMode')
var ErrorType = require('./Constants/ErrorType')
var FallbackMethod = require('./Constants/FallbackMethod')
var OPCode = require('./Constants/OPCode')
var TraceId = require('./Constants/TraceId')

// C2S
var NotifyCSEncryptedSessionKey = require('./C2S/NotifyCSEncryptedSessionKey')
var NotifyServerConnectionRequestData = require('./C2S/NotifyServerConnectionRequestData')
var ServerHolepunch = require('./C2S/ServerHolepunch')
var NotifyHolepunchSuccess = require('./C2S/NotifyHolepunchSuccess')
var PeerUdpServerHolepunch = require('./C2S/PeerUdpServerHolepunch')
var PeerUdpNotifyHolepunchSuccess = require('./C2S/PeerUdpNotifyHolepunchSuccess')
var ReliableRelay1 = require('./C2S/ReliableRelay1')
var UnreliableRelay1 = require('./C2S/UnreliableRelay1')
var UnreliablePing = require('./C2S/UnreliablePing')
var SpeedHackDetectorPing = require('./C2S/SpeedHackDetectorPing')

// S2C
var NotifyServerConnectionHint = require('./S2C/NotifyServerConnectionHint')
var NotifyCSSessionKeySuccess = require('./S2C/NotifyCSSessionKeySuccess')
var NotifyProtocolVersionMismatch = require('./S2C/NotifyProtocolVersionMismatch')
var NotifyServerDeniedConnection = require('./S2C/NotifyServerDeniedConnection')
var NotifyServerConnectSuccess = require('./S2C/NotifyServerConnectSuccess')
var RequestStartServerHolepunch = require('./S2C/RequestStartServerHolepunch')
var ServerHolepunchAck = require('./S2C/ServerHolepunchAck')
var NotifyClientServerUdpMatched = require('./S2C/NotifyClientServerUdpMatched')
var PeerUdpServerHolepunchAck = require('./S2C/PeerUdpServerHolepunchAck')
var ReliableRelay2 = require('./S2C/ReliableRelay2')
var UnreliableRelay2 = require('./S2C/UnreliableRelay2')
var UnreliablePong = require('./S2C/UnreliablePong')

// SC
var Rmi = require('./SC/Rmi')
var EncryptedReliable = require('./SC/EncryptedReliable')
var Compressed = require('./SC/Compressed')

// Rmi (C2S)
var ReliablePing = require('./Rmi/C2S/ReliablePing')
var P2PNotifyDirectP2PDisconnected = require('./Rmi/C2S/P2PNotifyDirectP2PDisconnected')
var NotifyUdpToTcpFallbackByClient = require('./Rmi/C2S/NotifyUdpToTcpFallbackByClient')
var P2PGroupMemberJoinAck = require('./Rmi/C2S/P2PGroupMemberJoinAck')
var NotifyP2PHolepunchSuccess = require('./Rmi/C2S/NotifyP2PHolepunchSuccess')
var ShutdownTcp = require('./Rmi/C2S/ShutdownTcp')
var ShutdownTcpHandshake = require('./Rmi/C2S/ShutdownTcpHandshake')
var NotifyLog = require('./Rmi/C2S/NotifyLog')
var NotifyPeerUdpSocketRestored = require('./Rmi/C2S/NotifyPeerUdpSocketRestored')
var NotifyJitDirectP2PTriggered = require('./Rmi/C2S/NotifyJitDirectP2PTriggered')
var NotifyNatDeviceNameDetected = require('./Rmi/C2S/NotifyNatDeviceNameDetected')
var NotifySendSpeed = require('./Rmi/C2S/NotifySendSpeed')
var ReportP2PPeerPing = require('./Rmi/C2S/ReportP2PPeerPing')
var C2SRequestCreateUdpSocket = require('./Rmi/C2S/C2SRequestCreateUdpSocket')
var C2SCreateUdpSocketAck = require('./Rmi/C2S/C2SCreateUdpSocketAck')
var ReportC2CUdpMessageCount = require('./Rmi/C2S/ReportC2CUdpMessageCount')
var ReportC2SUdpMessageTrialCount = require('./Rmi/C2S/ReportC2SUdpMessageTrialCount')

// Rmi (S2C)
var P2PGroupMemberJoin = require('./Rmi/S2C/P2PGroupMemberJoin')
var P2PGroupMemberJoinUnencrypted = require('./Rmi/S2C/P2PGroupMemberJoinUnencrypted')
var P2PRecycleComplete = require('./Rmi/S2C/P2PRecycleComplete')
var RequestP2PHolepunch = require('./Rmi/S2C/RequestP2PHolepunch')
var P2PGroupMemberLeave = require('./Rmi/S2C/P2PGroupMemberLeave')
var ReliablePong = require('./Rmi/S2C/ReliablePong')
//var EnableLog = require('./Rmi/S2C/EnableLog')
var ShutdownTcpAck = require('./Rmi/S2C/ShutdownTcpAck')
var NewDirectP2PConnection = require('./Rmi/S2C/NewDirectP2PConnection')
var S2CRequestCreateUdpSocket = require('./Rmi/S2C/S2CRequestCreateUdpSocket')
var S2CCreateUdpSocketAck = require('./Rmi/S2C/S2CCreateUdpSocketAck')

var log = new Logger('ProudNetServer', true)

function parseData(session, self) {
	if(session.bufferedData.length < 2) {
		return
	}

	var magic = session.bufferedData.readInt16LE(0)

	// Check magic
	if(magic !== 22291) {
		var bufferLength = session.bufferedData.length
		session.bufferedData = session.bufferedData.slice(2, bufferLength)

		return process.nextTick(function() { parseData(session, self) })
	}

	var sizePrefix = session.bufferedData.readUInt8(2)
	var size
	var addSize
	if(sizePrefix === 1) {
		size = session.bufferedData.readUInt8(3)
		addSize = 4
	} else if(sizePrefix === 2) {
		size = session.bufferedData.readUInt16LE(3)
		addSize = 5
	} else if(sizePrefix === 4) {
		size = session.bufferedData.readUInt32LE(3)
		addSize = 7
	}

	// Check Size...
	var bufferLength = session.bufferedData.length
	if(size + addSize > bufferLength) {
		return // The packet is larger than the received data.
	}

	// Extract thingy
	var packet = session.bufferedData.slice(0, size + addSize)

	// shrink data
	session.bufferedData = session.bufferedData.slice(size + addSize, bufferLength)

	newPacket(packet, session, self)

	// check if we hit the end with reading from our data buffer
	if(session.bufferedData.length === 0) {
		return
	}

	process.nextTick(() => {
		parseData(session, self)
	})
}

function newPacket(data, session, self) {
	var packet = new Packet(data)
	var magic = packet.readInt16LE()
	if(magic !== 22291) {
		return // TODO: Is this enough? Not sure...
	}
	var size = packet.readProudSize()
	processPacket(packet, size, session, self)
}

function processPacket(packet, size, session, self) {
	var opCode = packet.readUInt8() // MessageType
	//log.debug('ProudNet Packet received [OPCode: ' + OPCode.getKeyByValue(opCode) + ']')

	if(opCode === OPCode.Rmi) {
		//log.debug('ProudNet Packet [Rmi] [Rmi: ' + OPCode.getKeyByValue(opCode) + ']')
		var rmiId = packet.readUInt16LE()
		if(rmiId === OPCode.ReliablePing) {
			//log.debug('Packet Received [ReliablePing]')
			var packet = ReliablePing.deserialize(packet)

			//log.debug('Recent Frame Rate: ' + packet.recentFrameRate)

			session.write(Rmi.serialize(OPCode.ReliablePong, ReliablePong.serialize()))
			//log.debug('Packet Sent [ReliablePong]')
		} else if(rmiId === OPCode.P2PNotifyDirectP2PDisconnected) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [P2PNotifyDirectP2PDisconnected]')
			var packet = P2PNotifyDirectP2PDisconnected.deserialize(packet)

			log.debug('Member Host ID: ' + packet.memberHostId + ' Reason: ' + ErrorType.getKeyByValue(packet.reason))

			// TODO
		} else if(rmiId === OPCode.NotifyUdpToTcpFallbackByClient) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [NotifyUdpToTcpFallbackByClient]')
			var packet = NotifyUdpToTcpFallbackByClient.deserialize(packet)

			// TODO:
			// Seems to be sent from the client when the UDP Socket broke...
			// But why does it break out of nowhere?
			// So should we close the UDP Socket here? Otherwise we would leak UDP Sockets...

			if(session.udpEnabled) {
				session.udpEnabled = false
				session.udpSendAddress = null
				session.udpSendPort = null
			}

			if(session.udpSocket) {
				session.udpSocket.close()
				session.udpSocket = null
			}
		} else if(rmiId === OPCode.P2PGroupMemberJoinAck) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [P2PGroupMemberJoinAck]')
			var packet = P2PGroupMemberJoinAck.deserialize(packet)

			log.debug('Group Host ID: ' + packet.groupHostId + ' Member Host ID: ' + packet.memberHostId + ' Event ID: ' + packet.eventId + ' Localport Reuse Success: ' + packet.localportReuseSuccess)

			if(!self.enableC2CUDP) {
				return
			}

			if(packet.groupHostId !== session.groupId || packet.memberHostId === session.hostId) {
				return
			}

			//var group = self.getGroupByID(session.groupId)
			var remoteSession = self.getSessionByHostID(packet.memberHostId)

			if(session.hostId !== remoteSession.hostId) {
				session.write(Rmi.serialize(OPCode.P2PRecycleComplete, P2PRecycleComplete.serialize(remoteSession.hostId, false, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535)))
				log.debug('Packet Sent [P2PRecycleComplete]')

            	remoteSession.write(Rmi.serialize(OPCode.P2PRecycleComplete, P2PRecycleComplete.serialize(session.hostId, false, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535)))
				log.debug('Packet Sent [P2PRecycleComplete]')
			}

			return

			var remotePeer = session.P2PGroup.Members[session.hostId]
            var connectionState = remotePeer.ConnectionStates.GetValueOrDefault(message.AddedMemberHostId);

            if (connectionState.EventId != message.EventId)
                return

            connectionState.IsJoined = true
            var connectionStateB = connectionState.RemotePeer.ConnectionStates[session.HostId]
            if (connectionStateB.IsJoined) {
            	session.write(Rmi.serialize(OPCode.P2PRecycleComplete, P2PRecycleComplete.serialize(remoteSession.hostId, false, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535)))
				log.debug('Packet Sent [P2PRecycleComplete]')

            	remoteSession.write(Rmi.serialize(OPCode.P2PRecycleComplete, P2PRecycleComplete.serialize(session.hostId, false, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535, '255.255.255.255', 65535)))
				log.debug('Packet Sent [P2PRecycleComplete]')
            }
		} else if(rmiId === OPCode.NotifyP2PHolepunchSuccess) {
			// TODO: Relay only?

			log.debug('Packet Received [NotifyP2PHolepunchSuccess]')
			var packet = NotifyP2PHolepunchSuccess.deserialize(packet)

			log.debug('A: ' + packet.a + ' B: ' + packet.b)
			log.debug(Packet.dump(packet.remaining))
		} else if(rmiId === OPCode.ShutdownTcp) {
			//log.debug('Packet Received [ShutdownTcp]')
			var packet = ShutdownTcp.deserialize(packet)

			//log.debug('Comment: ' + packet.comment)

			session.write(Rmi.serialize(OPCode.ShutdownTcpAck, ShutdownTcpAck.serialize()))
			//log.debug('Packet Sent [ShutdownTcpAck]')
		} else if(rmiId === OPCode.ShutdownTcpHandshake) {
			//log.debug('Packet Received [ShutdownTcpHandshake]')
			var packet = ShutdownTcpHandshake.deserialize(packet)

			session.end()
		} else if(rmiId === OPCode.NotifyLog) {
			log.debug('Packet Received [NotifyLog]')
			var packet = NotifyLog.deserialize(packet)

			log.debug('Trace ID: ' + TraceId.getKeyByValue(packet.traceId) + ' Text: ' + packet.text)
		} else if(rmiId === OPCode.NotifyPeerUdpSocketRestored) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2S2CUDP) {
				return
			}

			if(!self.enableC2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [NotifyPeerUdpSocketRestored]')
			var packet = NotifyPeerUdpSocketRestored.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId)
			log.debug(Packet.dump(packet.remaining))
		} else if(rmiId === OPCode.NotifyJitDirectP2PTriggered) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [NotifyJitDirectP2PTriggered]')
			var packet = NotifyJitDirectP2PTriggered.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId)

			var remotePeerA = session
            var remotePeerB = self.getSessionByHostID(packet.hostId)

			if(!remotePeerB) {
				return
			}

			//var stateA = remotePeerA.ConnectionStates.GetValueOrDefault(remotePeerB.HostId)
            //var stateB = remotePeerB.ConnectionStates.GetValueOrDefault(remotePeerA.HostId)

            //if (stateA == null || stateB == null)
            //    return;

            //if (session.HostId == remotePeerA.HostId)
            //    stateA.JitTriggered = true
           	//else if (session.HostId == remotePeerB.HostId)
            //    stateB.JitTriggered = true

            //if (stateA.JitTriggered && stateB.JitTriggered)
            //{
				remotePeerA.write(Rmi.serialize(OPCode.NewDirectP2PConnection, NewDirectP2PConnection.serialize(remotePeerB.hostId)))
				log.debug('Packet Sent [NewDirectP2PConnection]')

				remotePeerB.write(Rmi.serialize(OPCode.NewDirectP2PConnection, NewDirectP2PConnection.serialize(remotePeerA.hostId)))
				log.debug('Packet Sent [NewDirectP2PConnection]')
            //}
		} else if(rmiId === OPCode.NotifyNatDeviceNameDetected) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [NotifyNatDeviceNameDetected]')
			var packet = NotifyNatDeviceNameDetected.deserialize(packet)

			log.debug('String: ' + packet.string)
		} else if(rmiId === OPCode.NotifySendSpeed) {
			// TODO: Relay only?

			log.debug('Packet Received [NotifySendSpeed]')
			var packet = NotifySendSpeed.deserialize(packet)

			log.debug(Packet.dump(packet.remaining))
		} else if(rmiId === OPCode.ReportP2PPeerPing) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [ReportP2PPeerPing]')
			var packet = ReportP2PPeerPing.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId + ' Recent Ping: ' + packet.recentPing)
			log.debug(Packet.dump(packet.remaining))
		} else if(rmiId === OPCode.C2SRequestCreateUdpSocket) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2S2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [C2SRequestCreateUdpSocket]')
			var packet = C2SRequestCreateUdpSocket.deserialize(packet)

			// TODO: Only let this method to be called once.

			session.udpSocket = dgram.createSocket('udp4')

			session.udpSocket.on('listening', function() {
				log.debug('[UDP] Socket opened on ' + session.udpSocket.address().address + ':' + session.udpSocket.address().port)

				session.udpPort = session.udpSocket.address().port

				session.write(Rmi.serialize(OPCode.S2CCreateUdpSocketAck, S2CCreateUdpSocketAck.serialize(1, self.ip, session.udpPort)))
				log.debug('Packet Sent [S2CCreateUdpSocketAck]')

				session.holepunchMagicNumber = uuid.v4(null, Buffer.alloc(16))

				session.write(RequestStartServerHolepunch.serialize(session.holepunchMagicNumber))
				log.debug('Packet Sent [RequestStartServerHolepunch]')
			})

			session.udpSocket.on('message', function(data, udpSession) {
				// We only allow IPv4... IPv6 isn't supported by the S4Client.
				if(udpSession.family !== 'IPv4') {
					return log.debug('[UDP] Message dropped - Not IPv4')
				}

				session.udpSendAddress = udpSession.address
				session.udpSendPort = udpSession.port

				//log.debug('[UDP] Message received')
				//log.debug(Packet.dump(data))

				var packet = new Packet(data)

				// UDP Frag Header
				var flag = packet.readUInt16LE()
                var sessionId = packet.readUInt16LE()
                var length = packet.readInt32LE()
                var id = packet.readInt32LE()
                var fragId = packet.readInt32LE()

				//log.debug('Flag: ' + flag + ' Session ID: ' + sessionId + ' Length: ' + length + ' ID: ' + id + ' Frag ID: ' + fragId)

				if (flag != 43981) {
					log.debug('Received Fragment instead of FullFragment')
					return
				}

				if(!session.udpSessionId) {
					session.udpSessionId = sessionId
				}

				var magic = packet.readInt16LE()
				var size = packet.readProudSize()

				var packet = new Packet(packet.readBuffer(size))
				processPacket(packet, size, session, self)
			})

			session.udpSocket.on('error', function(e) {
				if(e.code == 'EACCES') {
					log.error('[UDP] Port ' + Config.port + ' already in use')
				} else {
					log.error('[UDP] Unhandled error occured: ' + e.code)
				}
			})

			session.udpSocket.bind()
		} else if(rmiId === OPCode.C2SCreateUdpSocketAck) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2S2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', session, rmiId, data)
				return
			}

			log.debug('Packet Received [C2SCreateUdpSocketAck]')
			var packet = C2SCreateUdpSocketAck.deserialize(packet)

			// TODO: Only let this method to be called once.

			log.debug('Success: ' + packet.success)

			// TODO: When?

			return

			session.write(Rmi.serialize(OPCode.S2CCreateUdpSocketAck, S2CCreateUdpSocketAck.serialize(1, self.ip, session.udpPort)))
			log.debug('Packet Sent [S2CCreateUdpSocketAck]')

			session.holepunchMagicNumber = uuid.v4(null, Buffer.alloc(16))

			session.write(RequestStartServerHolepunch.serialize(session.holepunchMagicNumber))
			log.debug('Packet Sent [RequestStartServerHolepunch]')
		} else if(rmiId === OPCode.ReportC2CUdpMessageCount) {
			//log.debug('Packet Received [ReportC2CUdpMessageCount]')
			var packet = ReportC2CUdpMessageCount.deserialize(packet)

			//log.debug('Host ID: ' + packet.hostId + ' UDP Message Trial Count: ' + packet.udpMessageTrialCount + ' UDP Message Success Count: ' + packet.udpMessageSuccessCount)
		} else if(rmiId === OPCode.ReportC2SUdpMessageTrialCount) {
			//log.debug('Packet Received [ReportC2SUdpMessageTrialCount]')
			var packet = ReportC2SUdpMessageTrialCount.deserialize(packet)

			//log.debug('To Server UDP Trial Count: ' + packet.toServerUdpTrialCount)
		} else {
			var data = new Packet(packet.readRemaining())
			self.emit('packet', session, rmiId, data)
		}
	} else if(opCode === OPCode.NotifyCSEncryptedSessionKey) {
		//log.debug('ProudNet Packet [NotifyCSEncryptedSessionKey]')
		var packet = NotifyCSEncryptedSessionKey.deserialize(packet)

		// Decrypt sessionKey via RSA
		session.sessionKey = self.rsa.decrypt(packet.sessionKeyEncrypted)

		// Decrypt fastEncryptKey
		var cipher = crypto.createDecipheriv('aes-' + self.encryptedMessageKeyLength + '-ecb', session.sessionKey, '').setAutoPadding(false)
		var fastEncryptKey = Buffer.concat([cipher.update(packet.fastEncryptKeyEncrypted), cipher.final()])

		// TODO: Fix fastEncryptKey!
		if(self.fastEncryptedMessageKeyLength === 0 && !Common.ZeroFastEncryptKey.equals(fastEncryptKey)) {
			return session.write(NotifyServerDeniedConnection.serialize())
		}

		self.fastEncryptKey = fastEncryptKey

		session.write(NotifyCSSessionKeySuccess.serialize())
	} else if(opCode === OPCode.NotifyServerConnectionRequestData) {
		//log.debug('ProudNet Packet [NotifyServerConnectionRequestData]')
		var packet = NotifyServerConnectionRequestData.deserialize(packet)

		log.debug(Packet.dump(packet.protocolVersion))

		if(/*self.protocolVersion.equals(packet.protocolVersion) && *//*packet.internalVersion === Common.InternalVersion*/true) {
			session.hostId = self.hostId
			self.addSession(session)
			self.hostId++
			if(self.enableRelaying) {
				session.connectionMagicNumber = uuid.v4(null, Buffer.alloc(16))
				// Generate needed keys...
				if(self.enableP2PEncryptedMessaging) {
					session.p2pAESSessionKey = Buffer.from([0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69, 0x69])//crypto.randomBytes(16)
					session.p2pRC4SessionKey = Buffer.alloc(0) // TODO: Do we need a real key?
				}
			}
			session.write(NotifyServerConnectSuccess.serialize(session.hostId, self.serverInstanceGuid, Buffer.alloc(0), session.remoteAddress, session.remotePort))
		} else {
			session.write(NotifyProtocolVersionMismatch.serialize())
		}
	} else if(opCode === OPCode.ServerHolepunch) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		log.debug('ProudNet Packet [ServerHolepunch]')
		var packet = ServerHolepunch.deserialize(packet)

		log.debug('Hole Punch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))

		if(!session.holepunchMagicNumber.equals(packet.holepunchMagicNumber)) {
			log.error('Holepunch Magic Number Mismatch!')
			return
		}

		sendToUdpSocket(session, ServerHolepunchAck.serialize(packet.holepunchMagicNumber, session.remoteAddress, session.udpSendPort))
		log.debug('Packet Sent [ServerHolepunchAck]')
	} else if(opCode === OPCode.NotifyHolepunchSuccess) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		log.debug('ProudNet Packet [NotifyHolepunchSuccess]')
		var packet = NotifyHolepunchSuccess.deserialize(packet)

		log.debug('Hole Punch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))
		log.debug('Internal Addr [IP: ' + packet.internalAddrIp + ' Port: ' + packet.internalAddrPort + ']')
		log.debug('External Addr [IP: ' + packet.externalAddrIp + ' Port: ' + packet.externalAddrPort + ']')

		session.udpEnabled = true
    	//session.udpEndPoint = message.EndPoint
        //session.udpLocalEndPoint = message.LocalEndPoint

		session.write(NotifyClientServerUdpMatched.serialize(packet.holepunchMagicNumber))
		log.debug('Packet Sent [NotifyClientServerUdpMatched]')
	} else if(opCode === OPCode.PeerUdpServerHolepunch) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(!self.enableC2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		log.debug('ProudNet Packet [PeerUdpServerHolepunch]')
		var packet = PeerUdpServerHolepunch.deserialize(packet)

		log.debug('Hole Punch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))
		log.debug('Host ID: ' + packet.hostId)

		var target = self.getSessionByHostID(packet.hostId)
		if(!target || !target.udpEnabled) {
			return
		}

		sendToUdpSocket(session, PeerUdpServerHolepunchAck.serialize(packet.holepunchMagicNumber, target.udpSendAddress, target.udpSendPort, target.hostId))
		log.debug('Packet Sent [PeerUdpServerHolepunchAck]')
	} else if(opCode === OPCode.PeerUdpNotifyHolepunchSuccess) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(!self.enableC2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		log.debug('ProudNet Packet [PeerUdpNotifyHolepunchSuccess]')
		var packet = PeerUdpNotifyHolepunchSuccess.deserialize(packet)

		log.debug('Internal Addr [IP: ' + packet.internalAddrIp + ' Port: ' + packet.internalAddrPort)
		log.debug('External Addr [IP: ' + packet.externalAddrIp + ' Port: ' + packet.externalAddrPort)
		log.debug('Host ID: ' + packet.hostId)

		// TODO: Dunno
		//setTimeout(function() {
			session.write(Rmi.serialize(OPCode.RequestP2PHolepunch, RequestP2PHolepunch.serialize(packet.hostId, packet.internalAddrIp, packet.internalAddrPort, packet.externalAddrIp, packet.externalAddrPort)))
			log.debug('Packet Sent [RequestP2PHolepunch]')
		//}, 20000)
	} else if(opCode === OPCode.ReliableRelay1) {
		if(!self.enableRelaying) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		//log.debug('ProudNet Packet [ReliableRelay1]')
		var packet = ReliableRelay1.deserialize(packet)

		// TODO: Implement it?
		//if(packet.hosts.length > 2) {
		//	log.error('No more than 2 receivers allowed.')
		//	return
		//}

		for (i = 0; i < packet.hosts.length; i++) {
			var host = packet.hosts[i]
			if(host.hostId === 2) {
				var packet1 = new Packet(packet.data)
				var magic = packet1.readInt16LE()
				if(magic !== 22291) {
					continue
				}
				var size = packet1.readProudSize()
				handleOwnServerPacket(packet1, 'ReliableRelay1', self)
				continue
			}
			var receiver = self.getSessionByHostID(host.hostId)

			// TODO: FrameNumber! Important for UDP Framing! Not used by TCP.
			//log.warning('FrameNumber: ' + host.frameNumber)

			if(!receiver) {
				continue
			}

			if(session.groupId !== receiver.groupId) {
				continue
			}

			receiver.write(ReliableRelay2.serialize(session.hostId, host.frameNumber, packet.data))
		}
	} else if(opCode === OPCode.UnreliableRelay1) {
		if(!self.enableRelaying) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', session, opCode, data)
			return
		}

		//log.debug('ProudNet Packet [UnreliableRelay1]')
		var packet = UnreliableRelay1.deserialize(packet)

		// TODO: Implement it?
		//if(packet.hostIds.length > 2) {
		//	log.error('No more than 2 receivers allowed.')
		//	return
		//}

		for (i = 0; i < packet.hostIds.length; i++) {
			if(packet.hostIds[i] === 2) {
				var packet1 = new Packet(packet.data)
				handleOwnServerPacket(packet1, 'UnreliableRelay1', self)
				continue
			}

			var receiver = self.getSessionByHostID(packet.hostIds[i])

			if(!receiver) {
				continue
			}

			if(session.groupId !== receiver.groupId) {
				continue
			}

			var data = UnreliableRelay2.serialize(session.hostId, packet.data)

			if(receiver.udpEnabled) {
				sendToUdpSocket(receiver, data)
			} else {
				receiver.write(data)
			}
		}
	} else if(opCode === OPCode.UnreliablePing) {
		//log.debug('ProudNet Packet [UnreliablePing]')
		var packet = UnreliablePing.deserialize(packet)

		var hrtime = process.hrtime()
		var result = hrtime[0] + '.' + hrtime[1]

		session.write(UnreliablePong.serialize(packet.absoluteTimeMs, result))
	} else if(opCode === OPCode.SpeedHackDetectorPing) {
		//log.debug('ProudNet Packet [SpeedHackDetectorPing]')
		var packet = SpeedHackDetectorPing.deserialize(packet)

		session.lastSpeedHackDetectorPing = new Date().getTime()
	} else if(opCode === OPCode.EncryptedReliable) {
		//log.debug('ProudNet Packet [EncryptedReliable]')
		var encryptMode = packet.readUInt8()
		if(encryptMode === EncryptMode.None) {
			log.error('EncryptMode "None" not implemented.')
			return
		} else if(encryptMode === EncryptMode.Secure) {
			var data_encrypted = packet.readProudBuffer()

			// Decrypt the Data
			var cipher = crypto.createDecipheriv('aes-' + self.encryptedMessageKeyLength + '-ecb', session.sessionKey, '').setAutoPadding(false)
			var data_decrypted = Buffer.concat([cipher.update(data_encrypted), cipher.final()])
		} else if(encryptMode === EncryptMode.Fast) {
			log.error('EncryptMode "Fast" not implemented.')
			return
		} else if(encryptMode === EncryptMode.Last) {
			log.error('EncryptMode "Last" not implemented.')
			return
		} else {
			log.error('EncryptMode ' + encryptMode + ' not supported.')
			return
		}

		var length = data_decrypted.length

		var packet = new Packet(data_decrypted)
		var paddingCount = packet.readUInt8()

		// Checksum check
		var crc = packet.readUInt32LE()
		var checksumData = new Packet(data_decrypted)
		checksumData.skip(5)
		var checksumDataBuffer = checksumData.readBuffer(checksumData.data.length - (5 + paddingCount))
		var crcCalculated = CRC.crc32(checksumDataBuffer)
		// Drop the packet if the checksum is wrong
		if(crc !== crcCalculated) {
			log.error('Invalid Checksum. Expected: ' + crcCalculated + ' Got: ' + crc)
			return
		}

		// RecvRefCounter Check
		var recvRefCounter = packet.readUInt16LE()
		if(recvRefCounter === session.recvRefCounter) {
			session.recvRefCounter++
			// TODO: Refactor this
			// Against overflow and start again
			if(session.recvRefCounter === 65536) {
				session.recvRefCounter = 0
			}
		} else {
			log.warning('Invalid RecvRefCounter. Got: ' + recvRefCounter + ' Expected: ' + session.recvRefCounter)
			return
		}

		//log.debug('EncryptedPacket [PaddingCount: ' + paddingCount + ' CRC: ' + crc + ' RecvRefCounter: ' + recvRefCounter + ']')
		var newLength = length - paddingCount - 1 - 4 - 2
		var packet = new Packet(packet.readBuffer(newLength))
		processPacket(packet, newLength, session, self)
	} else if(opCode === OPCode.Compressed) {
		//log.debug('ProudNet Packet [Compressed]')
		var packet = Compressed.deserialize(packet)
		// TODO: Change to Async... Not Async because of stupid XBN Shit...
		var decompressedData = zlib.inflateSync(packet.compressedData)
		if(packet.decompressedSize !== decompressedData.length) {
			log.warning('Invalid compressed Data')
			return
		}
		var packet = new Packet(decompressedData)
		processPacket(packet, decompressedData.length, session, self)
	} else {
		log.warning('Unknown ProudNet Packet received [' + OPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readBuffer(size - 1)))
	}
}

function sendToUdpSocket(session, data) {
	// UDP Frag Header
	var udpFragHeader = new Packet('E')
	udpFragHeader.writeUInt16LE(43981) // flag
	udpFragHeader.writeUInt16LE(256) // sessionId
	udpFragHeader.writeUInt32LE(data.length) // length
	udpFragHeader.writeUInt32LE(0) // id
	udpFragHeader.writeUInt32LE(0) // fragId

	// UDP Packet
	var packet = new Packet('E')
	packet.writeBuffer(udpFragHeader.data.toBuffer())
	packet.writeBuffer(data)
	packet = packet.data.toBuffer()

	session.udpSocket.send(packet, 0, packet.length, session.udpSendPort, session.udpSendAddress)
}

function handleOwnServerPacket(packet, through, self) {
	//log.debug('!!')
	//log.debug(Packet.dump(packet.readRemaining()))

	var coreId = packet.readUInt8()
	if(coreId === 1) {
		var opCode = packet.readUInt16LE()
		var data = packet.readRemaining()
		var packet = new Packet(data)
		self.emit('checkPackets', opCode, packet, through)
	} else {
		log.error('Unknown Core ID! ' + opCode)
	}
}

function connectionClosed(session, self) {
	if(session.hostId) {
		self.removeSession(session)
	}

	if(session.udpSocket) {
		session.udpSocket.close()
		session.udpSocket = null
	}
}

var ProudNetServer = function(options) {
	if(!options) {
		log.error('Options not specified!')
		process.exit()
	}

	if(typeof options !== 'object') {
		log.error('Options need to be an Object!')
		process.exit()
	}

	if(!options.protocolVersion) {
		log.error('Protocol Version is missing!')
		process.exit()
	}

	// Validate encryptedMessageKeyLength
	if(!options.encryptedMessageKeyLength) {
		options.encryptedMessageKeyLength = 128
	}

	if([128, 192, 256].indexOf(options.encryptedMessageKeyLength) === -1) {
		log.error('Invalid encryptedMessageKeyLength. Allowed Key Lengths: 128, 192, 256. Defaulting to 128.')
		options.encryptedMessageKeyLength = 128
	}

	// Validate rsaBits
	if(!options.rsaBits) {
		options.rsaBits = 1024
	}

	if(options.rsaBits % 8 !== 0) {
		log.error('rsaBits must be a multiple of 8. Defaulting to 1024.')
		options.rsaBits = 1024
	}

	if(options.rsaBits > 4096) {
		log.warning('proudnet.rsaBits is set really high. Key Pair generation will take really long.')
	}

	this.delayedConnectHandshake = options.delayedConnectHandshake || false
	this.enableRelaying = options.enableRelaying || false
	this.enableC2S2CUDP = options.enableC2S2CUDP || false
	this.enableC2CUDP = options.enableC2CUDP || false
	this.hostId = 3
	this.protocolVersion = Buffer.from(options.protocolVersion)
	this.p2pProxy = options.p2pProxy || false

	// settings
	this.enableServerLog = +!!options.enableServerLog || 0
	this.fallbackMethod = options.fallbackMethod || FallbackMethod.None
	this.messageMaxLength = options.messageMaxLength || 65000
	this.timeoutTimeMs = options.timeoutTimeMs || 900
	this.directP2PStartCondition = options.directP2PStartCondition || DirectP2PStartCondition.Jit
	this.overSendSuspectingThresholdInBytes = options.overSendSuspectingThresholdInBytes || 15360
	this.enableNagleAlgorithm = +!!options.enableNagleAlgorithm || 1
	this.encryptedMessageKeyLength = options.encryptedMessageKeyLength
	this.fastEncryptedMessageKeyLength = options.fastEncryptedMessageKeyLength || 0
	this.allowServerAsP2PGroupMember = +!!options.allowServerAsP2PGroupMember || 0
	this.enableP2PEncryptedMessaging = options.hasOwnProperty('enableP2PEncryptedMessaging') ? +!!options.enableP2PEncryptedMessaging : 1
	this.upnpDetectNatDevice = +!!options.upnpDetectNatDevice || 1
	this.upnpTcpAddrPortMapping = +!!options.upnpTcpAddrPortMapping || 1
	this.enableLookaheadP2PSend = +!!options.enableLookaheadP2PSend || 0
	this.enablePingTest = +!!options.enablePingTest || 0
	this.emergencyLogLineCount = options.emergencyLogLineCount || 0

	//log.debug('Generating Key Pair...')
	this.rsa = new RSA({ b: options.rsaBits })
	this.publicKey = this.rsa.exportKey('pkcs1-public-der')

	this.serverInstanceGuid = uuid.v4(null, Buffer.alloc(16))

	this.groups = []
	this.sessions = []

	events.EventEmitter.call(this)

	//log.debug('ProudNetServer is ready!')
	server = net.createServer(function(session) {
		this.emit('connect', session)

		// Ensure NoDelay (disable Nagle algorithm) everywhere
		session.setNoDelay(true)

		// We only allow IPv4... IPv6 isn't supported by ProudNet.
		if(!net.isIPv4(session.remoteAddress) || !net.isIPv4(session.localAddress)) {
			log.debug('Connection closed - Not IPv4')
			session.destroy()
		}

		session.bufferedData = Buffer.alloc(0)
		session.recvRefCounter = 0
		session.sendRefCounter = 0
		session.udpEnabled = false

		if(!this.delayedConnectHandshake) {
			session.write(NotifyServerConnectionHint.serialize(this))
		}

		session.on('data', function(data) {
			session.bufferedData = Buffer.concat([session.bufferedData, data])
			parseData(session, this)
		}.bind(this))

		session.on('error', function(e) {
			connectionClosed(session, this)
			this.emit('error', session, e)
		}.bind(this))

		session.on('end', function() {
			connectionClosed(session, this)
			this.emit('end', session)
		}.bind(this))
	}.bind(this))

	server.on('error', function(e) {
		if(e.code == 'EADDRINUSE') {
			log.error('Port ' + this.port + ' already in use - exiting...')
			process.exit()
		} else {
			log.error('Unhandled server error occured:')
			log.error(e)
		}
	}.bind(this))
}

util.inherits(ProudNetServer, events.EventEmitter)

ProudNetServer.prototype.listen = function(port, ip) {
	this.port = port
	this.ip = ip
	server.listen(this.port, this.ip)
}

ProudNetServer.prototype.makeConnectHandshake = function(session) {
	if(!this.delayedConnectHandshake) {
		log.error('ProudNetServer->makeConnectHandshake() not allowed. Set "delayedConnectHandshake" to true.')
		return
	}

	session.write(NotifyServerConnectionHint.serialize(this))
}

ProudNetServer.prototype.send = function(session, opCode, data, compressMode) {
	if(!session.writable) {
		return
	}

	var dataPacket = new Packet('E')
	dataPacket.writeUInt8(OPCode.Rmi)
	dataPacket.writeUInt16LE(opCode)
	dataPacket.writeBuffer(data)
	data = dataPacket.data.toBuffer()

	if(compressMode === CompressMode.Zip) {
		var decompressedSize = data.length
		var compressedData = zlib.deflateSync(data)
		var compressedSize = compressedData.length

		var compressedPacket = new Packet('E')
		compressedPacket.writeUInt8(OPCode.Compressed)
		compressedPacket.writeProudSize(compressedSize)
		compressedPacket.writeProudSize(decompressedSize)
		compressedPacket.writeBuffer(compressedData)

		data = compressedPacket.data.toBuffer()
	}

	var packet = new Packet('E')
	packet.writeUInt16LE(session.sendRefCounter)
	packet.writeBuffer(data)

	// CRC
	var crc = CRC.crc32(packet.data.toBuffer())
	packet.writeUInt32LE(crc, 0)

	// PaddingCount
	var missing = packet.data.toBuffer().length % 16
	var paddingCount = 16 - missing - 1
	if(paddingCount !== 0) {
		for (i = 0; i < paddingCount; i++) {
			packet.writeUInt8(0)
		}
	}
	packet.writeUInt8(paddingCount, 0)

	var decryptedData = packet.data.toBuffer()

	// Encrypt
	var cipher = crypto.createCipheriv('aes-' + this.encryptedMessageKeyLength + '-ecb', session.sessionKey, '').setAutoPadding(false)
	var encryptedData = Buffer.concat([cipher.update(decryptedData), cipher.final()])

	session.write(EncryptedReliable.serialize(EncryptMode.Secure, encryptedData))
	session.sendRefCounter++
	// TODO: Refactor this
	// Against overflow and start again
	if(session.sendRefCounter === 65536) {
		session.sendRefCounter = 0
	}
}

// Temporary solution
ProudNetServer.prototype.sendAlreadyCompressed = function(session, data) {
	var packet = new Packet('E')
	packet.writeUInt16LE(session.sendRefCounter)
	packet.writeUInt8(OPCode.Compressed)
	packet.writeBuffer(data)

	// CRC
	var crc = CRC.crc32(packet.data.toBuffer())
	packet.writeUInt32LE(crc, 0)

	// PaddingCount
	var missing = packet.data.toBuffer().length % 16
	var paddingCount = 16 - missing - 1
	if(paddingCount !== 0) {
		for (i = 0; i < paddingCount; i++) {
			packet.writeUInt8(0)
		}
	}
	packet.writeUInt8(paddingCount, 0)

	var decryptedData = packet.data.toBuffer()

	// Encrypt
	var cipher = crypto.createCipheriv('aes-' + this.encryptedMessageKeyLength + '-ecb', session.sessionKey, '').setAutoPadding(false)
	var encryptedData = Buffer.concat([cipher.update(decryptedData), cipher.final()])

	session.write(EncryptedReliable.serialize(EncryptMode.Secure, encryptedData))
	session.sendRefCounter++
}

ProudNetServer.prototype.sendUnencrypted = function(session, opCode, data) {
	session.write(Rmi.serialize(opCode, data))
}

// RelayProxy Shit
ProudNetServer.prototype.sendProud = function(session, opCode, data) {
	var packet = new Packet(opCode)
	packet.writeBuffer(data)
	session.write(packet.finalize())
}

ProudNetServer.prototype.createP2PGroup = function() {
	if(!this.enableRelaying) {
		log.error('ProudNetServer->createP2PGroup() not allowed. Set "enableRelaying" to true.')
		return
	}

	var groupId = this.hostId
	this.hostId++
	var group = {
		id: groupId,
		sessions: []
	}

	this.addGroup(group)

	return groupId
}

ProudNetServer.prototype.deleteP2Pgroup = function(groupId) {
	if(!this.enableRelaying) {
		log.error('ProudNetServer->deleteP2Pgroup() not allowed. Set "enableRelaying" to true.')
		return
	}

	var group = this.getGroupByID(groupId)
	if(!group) {
		return
	}

	if(!group.sessions.length !== 0) {
		return
	}

	this.removeGroup(group)
}

ProudNetServer.prototype.joinP2PGroup = function(groupId, session) {
	if(!this.enableRelaying) {
		log.error('ProudNetServer->joinP2PGroup() not allowed. Set "enableRelaying" to true.')
		return
	}

	if(session.groupId) {
		return
	}

	var group = this.getGroupByID(groupId)
	if(!group) {
		return
	}

	group.sessions.push(session)

	session.groupId = groupId

	var customField = Buffer.alloc(0)

	// FAKE!
	if(this.enableP2PEncryptedMessaging) {
		session.write(Rmi.serialize(OPCode.P2PGroupMemberJoin, P2PGroupMemberJoin.serialize(groupId, 2, customField, 157754, Buffer.alloc(0), Buffer.alloc(0), 2281507973, Buffer.alloc(0), true, 0)))
		log.debug('Packet Sent [P2PGroupMemberJoin] FAKE')
	} else {
		session.write(Rmi.serialize(OPCode.P2PGroupMemberJoinUnencrypted, P2PGroupMemberJoinUnencrypted.serialize(groupId, 2, customField, 157754, 2281507973, Buffer.alloc(0), true, 0)))
		log.debug('Packet Sent [P2PGroupMemberJoinUnencrypted] FAKE')
	}

	for (var i = 0; i < group.sessions.length; ++i) {
		var receiver = group.sessions[i]

		if(this.enableP2PEncryptedMessaging) {
			receiver.write(Rmi.serialize(OPCode.P2PGroupMemberJoin, P2PGroupMemberJoin.serialize(groupId, session.hostId, customField, 157754, session.p2pAESSessionKey, session.p2pRC4SessionKey, 2281507973, session.connectionMagicNumber, true, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoin]')
		} else {
			receiver.write(Rmi.serialize(OPCode.P2PGroupMemberJoinUnencrypted, P2PGroupMemberJoinUnencrypted.serialize(groupId, session.hostId, customField, 157754, 2281507973, session.connectionMagicNumber, true, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoinUnencrypted]')
		}

		if(session.hostId === receiver.hostId) {
			continue
		}

		if(this.enableP2PEncryptedMessaging) {
			session.write(Rmi.serialize(OPCode.P2PGroupMemberJoin, P2PGroupMemberJoin.serialize(groupId, receiver.hostId, customField, 157754, receiver.p2pAESSessionKey, receiver.p2pRC4SessionKey, 2281507973, receiver.connectionMagicNumber, true, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoin]')
		} else {
			session.write(Rmi.serialize(OPCode.P2PGroupMemberJoinUnencrypted, P2PGroupMemberJoinUnencrypted.serialize(groupId, receiver.hostId, customField, 157754, 2281507973, receiver.connectionMagicNumber, true, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoinUnencrypted]')
		}
	}
}

ProudNetServer.prototype.leaveP2PGroup = function(session) {
	if(!this.enableRelaying) {
		log.error('ProudNetServer->leaveP2PGroup() not allowed. Set "enableRelaying" to true.')
		return
	}

	if(!session.groupId) {
		return
	}

	var groupId = session.groupId

	var group = this.getGroupByID(groupId)
	if(!group) {
		return
	}

	group.sessions.splice(group.sessions.indexOf(session), 1)

	session.groupId = null

	for (var i = 0; i < group.sessions.length; ++i) {
		var receiver = group.sessions[i]
		receiver.write(Rmi.serialize(OPCode.P2PGroupMemberLeave, P2PGroupMemberLeave.serialize(session.hostId, groupId)))
		//log.debug('Packet Sent [P2PGroupMemberLeave]')
	}

	//log.debug('Packet broadcasted to Group ' + groupId + ' [P2PGroupMemberLeave]')
}

ProudNetServer.prototype.broadcastToGroup = function(groupId, opCode, data) {
	var receivers = this.getSessionsByGroupID(groupId)

	if(!receivers) {
		return
	}

	for (var i = 0; i < receivers.length; ++i) {
		var receiver = receivers[i]
		this.send(receiver, opCode, data)
	}
}

ProudNetServer.prototype.setHostId = function(hostId) {
	this.hostId = hostId
}

ProudNetServer.prototype.addSession = function(session) {
	this.sessions.push(session)
}

ProudNetServer.prototype.addGroup = function(group) {
	this.groups.push(group)
}

ProudNetServer.prototype.getSessionsByGroupID = function(groupId) {
	for (var i = 0; i < this.groups.length; ++i) {
		if(this.groups[i].id === groupId) {
			return this.groups[i].sessions
		}
	}

	return []
}

ProudNetServer.prototype.getGroupByID = function(groupId) {
	for (var i = 0; i < this.groups.length; ++i) {
		if(this.groups[i].id === groupId) {
			return this.groups[i]
		}
	}

	return null
}

ProudNetServer.prototype.removeSession = function(session) {
	this.sessions.splice(this.sessions.indexOf(session), 1)
}

ProudNetServer.prototype.getSessionByHostID = function(hostId) {
	for (var i = 0; i < this.sessions.length; ++i) {
		if(this.sessions[i].hostId === hostId) {
			return this.sessions[i]
		}
	}

	return null
}

ProudNetServer.prototype.removeGroup = function(group) {
	this.groups.splice(this.groups.indexOf(group), 1)
}

//ProudNetServer.CompressMode = CompressMode

module.exports = ProudNetServer