var crypto = require('crypto')
var dgram = require('dgram')
var events = require('events')
var net = require('net')
var util = require('util')
var zlib = require('zlib')

var CRC = require('../node_modules/crc')
var RSA = require('../node_modules/node-rsa')

var Logger = require('../Utils/Logger')
var Packet = require('./Network/Packet')

var Common = require('./Constants/Common')
var CompressMode = require('./Constants/CompressMode')
var ConnectionState = require('./Constants/ConnectionState')
//var DirectP2PStartCondition = require('./Constants/DirectP2PStartCondition')
var EncryptMode = require('./Constants/EncryptMode')
var ErrorType = require('./Constants/ErrorType')
//var FallbackMethod = require('./Constants/FallbackMethod')
var OPCode = require('./Constants/OPCode')
//var TraceId = require('./Constants/TraceId')
var WorkerState = require('./Constants/WorkerState')

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

// SC
var Rmi = require('./SC/Rmi')
var EncryptedReliable = require('./SC/EncryptedReliable')
var Compressed = require('./SC/Compressed')

// Rmi (S2C)
var P2PGroupMemberJoin = require('./Rmi/S2C/P2PGroupMemberJoin')
var P2PGroupMemberJoinUnencrypted = require('./Rmi/S2C/P2PGroupMemberJoinUnencrypted')
var P2PRecycleComplete = require('./Rmi/S2C/P2PRecycleComplete')
var RequestP2PHolepunch = require('./Rmi/S2C/RequestP2PHolepunch')
var P2PGroupMemberLeave = require('./Rmi/S2C/P2PGroupMemberLeave')
//var ReliablePong = require('./Rmi/S2C/ReliablePong')
//var EnableLog = require('./Rmi/S2C/EnableLog')
//var ShutdownTcpAck = require('./Rmi/S2C/ShutdownTcpAck')
var NewDirectP2PConnection = require('./Rmi/S2C/NewDirectP2PConnection')
var S2CRequestCreateUdpSocket = require('./Rmi/S2C/S2CRequestCreateUdpSocket')
var S2CCreateUdpSocketAck = require('./Rmi/S2C/S2CCreateUdpSocketAck')

// Rmi (C2S)
//var ReliablePing = require('./Rmi/C2S/ReliablePing')
var P2PNotifyDirectP2PDisconnected = require('./Rmi/C2S/P2PNotifyDirectP2PDisconnected')
//var NotifyUdpToTcpFallbackByClient = require('./Rmi/C2S/NotifyUdpToTcpFallbackByClient')
var P2PGroupMemberJoinAck = require('./Rmi/C2S/P2PGroupMemberJoinAck')
//var NotifyP2PHolepunchSuccess = require('./Rmi/C2S/NotifyP2PHolepunchSuccess')
var ShutdownTcp = require('./Rmi/C2S/ShutdownTcp')
var ShutdownTcpHandshake = require('./Rmi/C2S/ShutdownTcpHandshake')
var NotifyLog = require('./Rmi/C2S/NotifyLog')
//var NotifyPeerUdpSocketRestored = require('./Rmi/C2S/NotifyPeerUdpSocketRestored')
var NotifyJitDirectP2PTriggered = require('./Rmi/C2S/NotifyJitDirectP2PTriggered')
//var NotifyNatDeviceNameDetected = require('./Rmi/C2S/NotifyNatDeviceNameDetected')
//var NotifySendSpeed = require('./Rmi/C2S/NotifySendSpeed')
//var ReportP2PPeerPing = require('./Rmi/C2S/ReportP2PPeerPing')
var C2SRequestCreateUdpSocket = require('./Rmi/C2S/C2SRequestCreateUdpSocket')
var C2SCreateUdpSocketAck = require('./Rmi/C2S/C2SCreateUdpSocketAck')
//var ReportC2CUdpMessageCount = require('./Rmi/C2S/ReportC2CUdpMessageCount')
//var ReportC2SUdpMessageTrialCount = require('./Rmi/C2S/ReportC2SUdpMessageTrialCount')

// Rmi (C2C)
var HolsterP2PHolepunchTrial = require('./Rmi/C2C/HolsterP2PHolepunchTrial')
var ReportUdpMessageCount = require('./Rmi/C2C/ReportUdpMessageCount')
var ReportServerTimeAndFrameRateAndPing = require('./Rmi/C2C/ReportServerTimeAndFrameRateAndPing')
var ReportServerTimeAndFrameRateAndPong = require('./Rmi/C2C/ReportServerTimeAndFrameRateAndPong')

var log = new Logger('ProudNetClient', true)

function parseData(self) {
	if(self.bufferedData.length < 2) {
		return
	}

	var magic = self.bufferedData.readInt16LE(0)

	// Check magic
	if(magic !== 22291) {
		var bufferLength = self.bufferedData.length
		self.bufferedData = self.bufferedData.slice(2, bufferLength)

		return process.nextTick(function() { parseData(self) })
	}

	if(self.bufferedData.length < 3) {
		return
	}
	var sizePrefix = self.bufferedData.readUInt8(2)
	var size
	var addSize
	if(sizePrefix === 1) {
		if(self.bufferedData.length < 4) {
			return
		}
		size = self.bufferedData.readUInt8(3)
		addSize = 4
	} else if(sizePrefix === 2) {
		if(self.bufferedData.length < 5) {
			return
		}
		size = self.bufferedData.readUInt16LE(3)
		addSize = 5
	} else if(sizePrefix === 4) {
		if(self.bufferedData.length < 7) {
			return
		}
		size = self.bufferedData.readUInt32LE(3)
		addSize = 7
	}

	// Check Size...
	var bufferLength = self.bufferedData.length
	if(size + addSize > bufferLength) {
		return // The packet is larger than the received data.
	}

	// Extract thingy
	var packet = self.bufferedData.slice(0, size + addSize)

	// shrink data
	self.bufferedData = self.bufferedData.slice(size + addSize, bufferLength)

	// new packet
	newPacket(self, packet)

	// check if we hit the end with reading from our data buffer
	if(self.bufferedData.length === 0) {
		return
	}

	process.nextTick(function() { parseData(self) })
}

function newPacket(self, data, type) {
	var packet = new Packet(data)
	var magic = packet.readInt16LE() // TODO: Validate it
	var size = packet.readProudSize()
	processPacket(self, packet, size, type)
}

function processPacket(self, packet, size, type) {
	var opCode = packet.readUInt8() // MessageType
	if(opCode === OPCode.Rmi) {
		//log.debug('ProudNet Packet [Rmi]')
		var rmiId = packet.readUInt16LE()
		if(rmiId === OPCode.P2PGroupMemberJoin) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			//log.debug('Packet Received [P2PGroupMemberJoin]')
			var packet = P2PGroupMemberJoin.deserialize(packet)

			//log.debug('Group Host ID: ' + packet.groupHostId)
			//log.debug('Member Host ID: ' + packet.memberHostId)
			//log.debug('Custom Field: ' + Packet.dump(packet.customField))
			//log.debug('Event ID: ' + packet.eventId)
			//log.debug('P2P AES Session Key: ' + Packet.dump(packet.p2pAESSessionKey))
			//log.debug('P2P RC4 Session Key: ' + Packet.dump(packet.p2pRC4SessionKey))
			//log.debug('P2P First Frame Number: ' + packet.p2pFirstFrameNumber)
			//log.debug('Connection Magic Number: ' + Packet.dump(packet.connectionMagicNumber))
			//log.debug('Enable Direct P2P: ' + packet.enableDirectP2P)
			//log.debug('BindPort: ' + packet.bindport)

			var group = self.getGroupByID(packet.groupHostId) || self.addGroup({ id: packet.groupHostId, members: [] })
			group.members.push({
				hostId: packet.memberHostId,
				//customField: packet.customField,
				//eventId: packet.eventId,
				p2pAESSessionKey: packet.p2pAESSessionKey,
				p2pRC4SessionKey: packet.p2pRC4SessionKey,
				p2pFirstFrameNumber: packet.p2pFirstFrameNumber,
				connectionMagicNumber: packet.connectionMagicNumber
				//enableDirectP2P: packet.enableDirectP2P,
				//bindport: packet.bindport
			})

			// Yourself? Set Infos
			if(self.hostId === packet.memberHostId) {
				self.groupId = packet.groupHostId
				self.p2pSessionKey = packet.p2pAESSessionKey
			}

			self.client.write(Rmi.serialize(OPCode.P2PGroupMemberJoinAck, P2PGroupMemberJoinAck.serialize(packet.groupHostId, packet.memberHostId, packet.eventId, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoinAck]')

			// TODO: We should delay it and respect the setting (JIT)
			if(!self.udpSocketActive) {
				self.udpSocketActive = true
				self.client.write(Rmi.serialize(OPCode.C2SRequestCreateUdpSocket, C2SRequestCreateUdpSocket.serialize()))
				log.debug('Packet Sent [C2SRequestCreateUdpSocket]')
			}

			self.emit('groupMemberJoin', packet.groupHostId, packet.memberHostId)
		} else if(rmiId === OPCode.P2PGroupMemberJoinUnencrypted) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			//log.debug('Packet Received [P2PGroupMemberJoinUnencrypted]')
			var packet = P2PGroupMemberJoinUnencrypted.deserialize(packet)

			//log.debug('Group Host ID: ' + packet.groupHostId)
			//log.debug('Member Host ID: ' + packet.memberHostId)
			//log.debug('Custom Field: ' + Packet.dump(packet.customField))
			//log.debug('Event ID: ' + packet.eventId)
			//log.debug('P2P First Frame Number: ' + packet.p2pFirstFrameNumber)
			//log.debug('Connection Magic Number: ' + Packet.dump(packet.connectionMagicNumber))
			//log.debug('Enable Direct P2P: ' + packet.enableDirectP2P)
			//log.debug('BindPort: ' + packet.bindport)

			var group = self.getGroupByID(packet.groupHostId) || self.addGroup({ id: packet.groupHostId, members: [] })
			group.members.push({
				hostId: packet.memberHostId,
				//customField: packet.customField,
				//eventId: packet.eventId,
				p2pFirstFrameNumber: packet.p2pFirstFrameNumber,
				connectionMagicNumber: packet.connectionMagicNumber
				//enableDirectP2P: packet.enableDirectP2P,
				//bindport: packet.bindport
			})

			// Yourself? Set Infos
			if(self.hostId === packet.memberHostId) {
				self.groupId = packet.groupHostId
			}

			self.client.write(Rmi.serialize(OPCode.P2PGroupMemberJoinAck, P2PGroupMemberJoinAck.serialize(packet.groupHostId, packet.memberHostId, packet.eventId, 0)))
			//log.debug('Packet Sent [P2PGroupMemberJoinAck]')

			// TODO: We should delay it and respect the setting (JIT)
			if(self.enableC2S2CUDP) {
				//self.client.write(Rmi.serialize(OPCode.C2SRequestCreateUdpSocket, C2SRequestCreateUdpSocket.serialize()))
				//log.debug('Packet Sent [C2SRequestCreateUdpSocket]')
			}

			self.emit('groupMemberJoin', packet.groupHostId, packet.memberHostId)
		} else if(rmiId === OPCode.P2PRecycleComplete) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [P2PRecycleComplete]')
			var packet = P2PRecycleComplete.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId + ' Recycled: ' + packet.recycled)
			log.debug('Internal Addr: ' + packet.internalAddrIp + ':' + packet.internalAddrPort)
			log.debug('External Addr: ' + packet.externalAddrIp + ':' + packet.externalAddrPort)
			log.debug('Send Addr: ' + packet.sendAddrIp + ':' + packet.sendAddrPort)
			log.debug('Recv Addr: ' + packet.recvAddrIp + ':' + packet.recvAddrPort)

			// TODO: Validate!

			self.client.write(Rmi.serialize(OPCode.NotifyJitDirectP2PTriggered, NotifyJitDirectP2PTriggered.serialize(packet.hostId)))
			log.debug('Packet Sent [NotifyJitDirectP2PTriggered]')
		} else if(rmiId === OPCode.RequestP2PHolepunch) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [RequestP2PHolepunch]')
			var packet = RequestP2PHolepunch.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId)
			log.debug('Internal Addr [IP: ' + packet.internalAddrIp + ' Port: ' + packet.internalAddrPort + ']')
			log.debug('External Addr [IP: ' + packet.externalAddrIp + ' Port: ' + packet.externalAddrPort + ']')

			// TODO
		} else if(rmiId === OPCode.P2PGroupMemberLeave) {
			if(!self.enableRelaying) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [P2PGroupMemberLeave]')
			var packet = P2PGroupMemberLeave.deserialize(packet)

			log.debug('Member Host ID: ' + packet.memberHostId + ' Group Host ID: ' + packet.groupHostId)

			var group = self.getGroupByID(packet.groupHostId)
			if(!group) {
				return
			}

			var member = self.getSessionInGroup(group, packet.memberHostId)
			if(!member) {
				return
			}

			self.removeMemberInGroup(group, member)
			if(group.members.length === 0) {
				self.removeGroup(group)
			}

			// Yourself? Remove Infos
			if(self.hostId === packet.memberHostId) {
				self.groupId = null
				self.p2pSessionKey = null
			}

			self.emit('groupMemberLeave', packet.groupHostId, packet.memberHostId)
		} else if(rmiId === OPCode.ShutdownTcpAck) {
			//log.debug('Packet Received [ShutdownTcpAck]')

			if(self.state !== WorkerState.Disconnecting) {
				return
			}

			self.client.write(Rmi.serialize(OPCode.ShutdownTcpHandshake, ShutdownTcpHandshake.serialize()))
			//log.debug('Packet Sent [ShutdownTcpHandshake]')
		} else if(rmiId === OPCode.RequestAutoPrune) {
			//log.debug('Packet Received [RequestAutoPrune]')

			// TODO
		} else if(rmiId === OPCode.NewDirectP2PConnection) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [NewDirectP2PConnection]')
			var packet = NewDirectP2PConnection.deserialize(packet)

			log.debug('Host ID: ' + packet.hostId)

			// TODO

			sendToUdpSocket(self, PeerUdpServerHolepunch.serialize(self.holepunchMagicNumber, packet.hostId))
			log.debug('Packet Sent [PeerUdpServerHolepunch]')
		} else if(rmiId === OPCode.S2CRequestCreateUdpSocket) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2S2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [S2CRequestCreateUdpSocket]')
			var packet = S2CRequestCreateUdpSocket.deserialize(packet)

			log.debug('IP: ' + packet.ip + ' Port: ' + packet.port)

			var success = 1

			self.udpSendAddress = packet.ip
			self.udpSendPort = packet.port

			self.udpSocket = dgram.createSocket('udp4')

			self.udpSocket.on('listening', function() {
				log.info('[UDP] Socket opened on ' + self.udpSocket.address().address + ':' + self.udpSocket.address().port)

				self.udpAddress = self.udpSocket.address().address
				self.udpPort = self.udpSocket.address().port
			})

			self.udpSocket.on('message', function(data, udpSession) {
				// We only allow IPv4... IPv6 isn't supported by the S4Client.
				if(udpSession.family !== 'IPv4') {
					return log.debug('[UDP] Message dropped - Not IPv4')
				}

				//session.udpSendAddress = udpSession.address
				//session.udpSendPort = udpSession.port

				log.debug('[UDP] Message received')
				//log.debug(Packet.dump(data))

				var packet = new Packet(data)

				// UDP Frag Header
				var flag = packet.readUInt16LE()
                var sessionId = packet.readUInt16LE()
                var length = packet.readInt32LE()
                var id = packet.readInt32LE()
                var fragId = packet.readInt32LE()

				log.debug('Flag: ' + flag + ' Session ID: ' + sessionId + ' Length: ' + length + ' ID: ' + id + ' Frag ID: ' + fragId)

				if (flag != 43981) {
					log.debug('Received Fragment instead of FullFragment')
					return
				}

				var magic = packet.readInt16LE()
				var size = packet.readProudSize()

				var packet = new Packet(packet.readBuffer(size))
				processPacket(self, packet, size)
			})

			self.udpSocket.on('error', function(e) {
				if(e.code == 'EACCES') {
					log.error('[UDP] Port ' + Config.port + ' already in use')
				} else {
					log.error('[UDP] Unhandled error occured: ' + e.code)
				}
			})

			self.udpSocket.bind()

			self.client.write(Rmi.serialize(OPCode.C2SCreateUdpSocketAck, C2SCreateUdpSocketAck.serialize(success)))
			log.debug('Packet Sent [C2SCreateUdpSocketAck]')
		} else if(rmiId === OPCode.S2CCreateUdpSocketAck) {
			if(!self.enableRelaying) {
				return
			}

			if(!self.enableC2S2CUDP) {
				return
			}

			if(self.p2pProxy) {
				var data = new Packet(packet.readBuffer(size - 1))
				self.emit('packet', rmiId, data)
				return
			}

			log.debug('Packet Received [S2CCreateUdpSocketAck]')
			var packet = S2CCreateUdpSocketAck.deserialize(packet)

			log.debug('Success: ' + packet.success + ' IP: ' + packet.ip + ' Port: ' + packet.port)

			if(!packet.success) {
				log.error('We got an error here...')
				return
			}

			self.udpSendAddress = packet.ip
			self.udpSendPort = packet.port
		} else if(rmiId === OPCode.HolsterP2PHolepunchTrial) {
			//log.debug('Packet Received [HolsterP2PHolepunchTrial]')
			//var packet = HolsterP2PHolepunchTrial.deserialize(packet)

			//log.debug('Remaining:')
			//log.debug(Packet.dump(packet.remaining))

			// TODO
		} else if(rmiId === OPCode.ReportUdpMessageCount) {
			//log.debug('Packet Received [ReportUdpMessageCount]')
			//var packet = ReportUdpMessageCount.deserialize(packet)

			//log.debug('UDP Success Count: ' + packet.udpSuccessCount)

			// TODO
		} else if(rmiId === OPCode.ReportServerTimeAndFrameRateAndPing) {
			//log.debug('Packet Received [ReportServerTimeAndFrameRateAndPing]')
			//log.debug(Packet.dump(packet.readRemaining()))
			// TODO: Crashed!
			//var packet = ReportServerTimeAndFrameRateAndPing.deserialize(packet)

			//log.debug('Client Local Time: ' + packet.clientLocalTime + ' Recent Frame Rate: ' + packet.recentFrameRate)

			// TODO
		} else if(rmiId === OPCode.ReportServerTimeAndFrameRateAndPong) {
			//log.debug('Packet Received [ReportServerTimeAndFrameRateAndPong]')
			//var packet = ReportServerTimeAndFrameRateAndPong.deserialize(packet)

			//log.debug('Client Old Local Time: ' + packet.clientOldLocalTime + ' Server Local Time: ' + packet.serverLocalTime + ' Server UDP Recent Ping: ' + packet.serverUdpRecentPing + ' Recent Frame Rate: ' + packet.recentFrameRate)

			// TODO
		} else {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('packet', rmiId, data, type)
		}
	} else if(opCode === OPCode.ConnectServerTimedout) {
		//log.warning('ProudNet Packet [ConnectServerTimedout]')
		self.state = WorkerState.Disconnecting
		self.client.destroy()
	} else if(opCode === OPCode.NotifyServerConnectionHint) {
		//log.debug('ProudNet Packet [NotifyServerConnectionHint]')
		var packet = NotifyServerConnectionHint.deserialize(packet)

		self.state = WorkerState.Connecting

		self.settings = packet.settings

		self.client.setNoDelay(!self.settings.enableNagleAlgorithm)

		// serialize Session Key
		self.sessionKey = crypto.randomBytes(self.settings.encryptedMessageKeyLength / 8)

		// Encrypt Key via RSA
		var rsa = new RSA()
		rsa.importKey(packet.key, 'pkcs1-public-der')
		var sessionKeyEncrypted = rsa.encrypt(self.sessionKey)

		// Encrypt Fast Encrypt Key
		var cipher = crypto.createCipheriv('aes-' + self.settings.encryptedMessageKeyLength + '-ecb', self.sessionKey, '').setAutoPadding(false)
		var fastEncryptKeyEncrypted = Buffer.concat([cipher.update(Common.ZeroFastEncryptKey), cipher.final()])

		self.client.write(NotifyCSEncryptedSessionKey.serialize(sessionKeyEncrypted, fastEncryptKeyEncrypted))
	} else if(opCode === OPCode.NotifyCSSessionKeySuccess) {
		//log.debug('ProudNet Packet [NotifyCSSessionKeySuccess]')
		var packet = NotifyCSSessionKeySuccess.deserialize(packet)
		self.client.write(NotifyServerConnectionRequestData.serialize(Buffer.alloc(0), self.protocolVersion, Common.InternalVersion))
	} else if(opCode === OPCode.NotifyProtocolVersionMismatch) {
		log.error('ProudNet Packet [NotifyProtocolVersionMismatch]')
		var packet = NotifyProtocolVersionMismatch.deserialize(packet)
		self.state = WorkerState.Disconnecting
	} else if(opCode === OPCode.NotifyServerDeniedConnection) {
		log.warning('ProudNet Packet [NotifyServerDeniedConnection]')
		var packet = NotifyServerDeniedConnection.deserialize(packet)
		self.state = WorkerState.Disconnecting
	} else if(opCode === OPCode.NotifyServerConnectSuccess) {
		//log.debug('ProudNet Packet [NotifyServerConnectSuccess]')
		var packet = NotifyServerConnectSuccess.deserialize(packet)

		self.hostId = packet.hostId

		var hrtime = process.hrtime()
		var result = hrtime[0] + '.' + hrtime[1]
		self.client.write(UnreliablePing.serialize(result, 0))

		self.pingInterval = setInterval(function() {
			// Ping Pong TimeOut Check
			var lastPong = new Date().getTime() - self.lastUnreliablePong.getTime()
			//log.debug('Last Pong: ' + lastPong)
			if(lastPong > 20000) {
				//log.error('Server Ping Pong TimeOut')
				self.destroy()
				self.emit('error', 'Server Ping Pong TimeOut')
				return
			}

			var hrtime = process.hrtime()
			var result = hrtime[0] + '.' + hrtime[1]
			self.client.write(UnreliablePing.serialize(result, 0))
		}, 10000)

		clearTimeout(self.connectTimeout)
		self.state = WorkerState.Connected
		self.emit('connect')
	} else if(opCode === OPCode.RequestStartServerHolepunch) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', opCode, data)
			return
		}

		log.debug('ProudNet Packet [RequestStartServerHolepunch]')
		var packet = RequestStartServerHolepunch.deserialize(packet)

		log.debug('Hole Punch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))

		self.holepunchMagicNumber = packet.holepunchMagicNumber

		sendToUdpSocket(self, ServerHolepunch.serialize(self.holepunchMagicNumber))
		log.debug('[UDP] ProudNet Packet [ServerHolepunch]')
	} else if(opCode === OPCode.ServerHolepunchAck) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', opCode, data)
			return
		}

		log.debug('ProudNet Packet [ServerHolepunchAck]')
		var packet = ServerHolepunchAck.deserialize(packet)

		log.debug('Addr [IP: ' + packet.addrIp + ' Port: ' + packet.addrPort + ']')
		log.debug('Holepunch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))

		if(!self.holepunchMagicNumber.equals(packet.holepunchMagicNumber)) {
			log.error('Holepunch Magic Number Mismatch!')
			return
		}

		// TODO: Needs to be received via UDP

		self.client.write(NotifyHolepunchSuccess.serialize(self.holepunchMagicNumber, self.udpAddress, self.udpPort, self.udpAddress, self.udpPort))
		log.debug('ProudNet Packet [NotifyHolepunchSuccess]')
	} else if(opCode === OPCode.NotifyClientServerUdpMatched) {
		if(!self.enableRelaying) {
			return
		}

		if(!self.enableC2S2CUDP) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', opCode, data)
			return
		}

		log.debug('ProudNet Packet [NotifyClientServerUdpMatched]')
		var packet = NotifyClientServerUdpMatched.deserialize(packet)

		log.debug('Holepunch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))

		if(!self.holepunchMagicNumber.equals(packet.holepunchMagicNumber)) {
			log.error('Holepunch Magic Number Mismatch!')
			return
		}

		// TODO
	} else if(opCode === OPCode.PeerUdpServerHolepunchAck) {
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
			self.emit('proudPacket', opCode, data)
			return
		}

		log.debug('ProudNet Packet [PeerUdpServerHolepunchAck]')
		var packet = PeerUdpServerHolepunchAck.deserialize(packet)

		log.debug('Hole Punch Magic Number: ' + Packet.dump(packet.holepunchMagicNumber))
		log.debug('Addr [IP: ' + packet.addrIp + ' Port: ' + packet.addrPort + ']')
		log.debug('Host ID: ' + packet.hostId)

		// TODO: Try to do the Hole Punch

		// TODO: Address...
		sendToUdpSocket(self, PeerUdpNotifyHolepunchSuccess.serialize('127.0.0.1', 3000, '127.0.0.1', 3000, packet.hostId))
		log.debug('ProudNet Packet [PeerUdpNotifyHolepunchSuccess]')
	} else if(opCode === OPCode.ReliableRelay2) {
		if(!self.enableRelaying) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', opCode, data)
			return
		}

		//log.debug('ProudNet Packet [ReliableRelay2]')
		var packet = ReliableRelay2.deserialize(packet)
		// TODO: Validate the FrameNumber?
		//log.debug('FrameNumber: ' + packet.frameNumber)
		// Parse the data
		newPacket(self, packet.data, packet.hostId)
	} else if(opCode === OPCode.UnreliableRelay2) {
		if(!self.enableRelaying) {
			return
		}

		if(self.p2pProxy) {
			var data = new Packet(packet.readBuffer(size - 1))
			self.emit('proudPacket', opCode, data)
			return
		}

		//log.debug('ProudNet Packet [UnreliableRelay2]')
		var packet = UnreliableRelay2.deserialize(packet)
		// Parse the data
		var packet_ = new Packet(packet.data)
		processPacket(self, packet_, packet_.data.length, packet.hostId)
	} else if(opCode === OPCode.UnreliablePong) {
		//log.debug('ProudNet Packet [UnreliablePong]')
		var packet = UnreliablePong.deserialize(packet)
		//log.debug('Absolute Time MS ' + packet.absoluteTimeMs + ' Server UDP Recent Ping MS ' + packet.serverUdpRecentPingMs)
		self.lastUnreliablePong = new Date()
	} else if(opCode === OPCode.EncryptedReliable) {
		//log.debug('ProudNet Packet [EncryptedReliable]')
		var encryptMode = packet.readUInt8()
		if(encryptMode === EncryptMode.None) {
			log.error('EncryptMode "None" not implemented.')
			return
		} else if(encryptMode === EncryptMode.Secure) {
			var data_encrypted = packet.readProudBuffer()

			if(data_encrypted.length % 16 !== 0) {
				log.warning('Invalid Encrypted Data Length: ' + data_encrypted.length)
				return
			}

			var decryptKey
			if(type) {
				var group = self.getGroupByID(self.groupId)
				var remoteSession = self.getSessionInGroup(group, type)
				if(!remoteSession) {
					return
				}
				decryptKey = remoteSession.p2pAESSessionKey//self.p2pSessionKey
			} else {
				decryptKey = self.sessionKey
			}

			// Decrypt the Data
			var cipher = crypto.createDecipheriv('aes-' + self.settings.encryptedMessageKeyLength + '-ecb', decryptKey, '').setAutoPadding(false)
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
		if(type) {
			// TODO!
		} else {
			if(recvRefCounter === self.recvRefCounter) {
				self.recvRefCounter++
				// TODO: Refactor this
				// Against overflow and start again
				if(self.recvRefCounter === 65536) {
					self.recvRefCounter = 0
				}
			} else {
				log.warning('Invalid RecvRefCounter. Got: ' + recvRefCounter + ' Expected: ' + self.recvRefCounter)
				return
			}
		}

		//log.debug('EncryptedPacket [PaddingCount: ' + paddingCount + ' CRC: ' + crc + ' RecvRefCounter: ' + recvRefCounter + ']')
		var newLength = length - paddingCount - 1 - 4 - 2
		var packet = new Packet(packet.readBuffer(newLength))
		processPacket(self, packet, newLength)
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
		processPacket(self, packet, decompressedData.length)
	} else {
		log.warning('Unknown ProudNet Packet received [OPCode: ' + OPCode.getKeyByValue(opCode) + ']')
		log.debug(Packet.dump(packet.readBuffer(size - 1)))
	}
}

function sendToUdpSocket(self, data) {
	// UDP Frag Header
	var udpFragHeader = new Packet('E')
	udpFragHeader.writeUInt16LE(43981) // flag
	udpFragHeader.writeUInt16LE(0) // sessionId
	udpFragHeader.writeUInt32LE(data.length) // length
	udpFragHeader.writeUInt32LE(0) // id
	udpFragHeader.writeUInt32LE(0) // fragId

	// UDP Packet
	var packet = new Packet('E')
	packet.writeBuffer(udpFragHeader.data.toBuffer())
	packet.writeBuffer(data)
	packet = packet.data.toBuffer()

	self.udpSocket.send(packet, 0, packet.length, self.udpSendPort, self.udpSendAddress)
}

var ProudNetClient = function(options) {
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

	this.bufferedData = Buffer.alloc(0);
	this.client = new net.Socket()
	this.enableRelaying = options.enableRelaying || false
	this.enableC2S2CUDP = options.enableC2S2CUDP || false
	this.enableC2CUDP = options.enableC2CUDP || false
	this.groupId = null
	this.recvRefCounter = 0
	this.sendRefCounter = 0
	this.protocolVersion = Buffer.from(options.protocolVersion)
	this.p2pProxy = options.p2pProxy || false
	this.p2pSessionKey
	this.sessionKey
	this.state = WorkerState.Disconnected

	this.groups = []

	events.EventEmitter.call(this)

	this.client.on('data', function(data) {
		this.bufferedData = Buffer.concat([this.bufferedData, data])
		parseData(this)
	}.bind(this))

	this.client.on('error', function(e) {
		clearTimeout(this.connectTimeout)
		clearInterval(this.pingInterval)
		this.emit('error', e)
	}.bind(this))

	this.client.on('close', function() {
		clearTimeout(this.connectTimeout)
		clearInterval(this.pingInterval)
		this.state = WorkerState.Disconnected
		this.emit('close')
	}.bind(this))
}

util.inherits(ProudNetClient, events.EventEmitter)

ProudNetClient.prototype.connect = function(port, ip, cb) {
	this.client.connect(port, ip, function() {
		if(cb) {
			cb()
		}
	})

	this.connectTimeout = setTimeout(function() {
		//log.error('Connect to Server timed out!')
		this.destroy()
		this.emit('error', 'Connect to Server timed out!')
	}.bind(this), 10000)
}

ProudNetClient.prototype.send = function(opCode, data, compressMode) {
	if(this.state !== WorkerState.Connected) {
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
	packet.writeUInt16LE(this.sendRefCounter)
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
	var cipher = crypto.createCipheriv('aes-' + this.settings.encryptedMessageKeyLength + '-ecb', this.sessionKey, '').setAutoPadding(false)
	var encryptedData = Buffer.concat([cipher.update(decryptedData), cipher.final()])

	this.client.write(EncryptedReliable.serialize(EncryptMode.Secure, encryptedData))
	this.sendRefCounter++
	// TODO: Refactor this
	// Against overflow and start again
	if(this.sendRefCounter === 65536) {
		this.sendRefCounter = 0
	}
}

// Temporary solution
ProudNetClient.prototype.sendAlreadyCompressed = function(session, data) {
	var packet = new Packet('E')
	packet.writeUInt16LE(this.sendRefCounter)
	packet.writeUInt8(OPCode.Compressed) // OPCode: 1 -> Rmi, 38 -> Compressed
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
	var cipher = crypto.createCipheriv('aes-' + this.settings.encryptedMessageKeyLength + '-ecb',this.sessionKey, '').setAutoPadding(false)
	var encryptedData = Buffer.concat([cipher.update(decryptedData), cipher.final()])

	Ack.EncryptedReliable(this, encryptedData)
	this.sendRefCounter++
}

ProudNetClient.prototype.sendUnencrypted = function(opCode, data) {
	this.client.write(Rmi.serialize(opCode, data))
}

ProudNetClient.prototype.sendUnreliableRelay = function(priority, uniqueIdCounter, hostIds, data) {
	this.client.write(UnreliableRelay1.serialize(priority, uniqueIdCounter, hostIds, data))
}

ProudNetClient.prototype.sendReliableRelay = function(hostIds, opCode, data, encryptMode) {
	if(this.state !== WorkerState.Connected) {
		return
	}

	if(hostIds.length === 0) {
		log.error('No Receivers specified.')
		return
	}

	if(hostIds.length !== 1 && encryptMode === EncryptMode.Secure) {
		log.error('Multiple receivers aren\'t allowed with Encryption. Please send it one by one.')
		return
	}

	var hosts = []

	for (var i = 0; i < hostIds.length; i++) {
		hosts.push({
			hostId: hostIds[i],
			frameNumber: 2281507973// TODO: Generate this shit for UDP.
		})
	}

	// TODO: Handle other Encrypt Modes
	if(encryptMode === EncryptMode.Secure) {
		var group = self.getGroupByID(this.groupId)
		var member = self.getSessionInGroup(group, hostIds[0])

		var packet = new Packet('E')
		packet.writeUInt16LE(0) // TODO: p2pSendRefCounter!
		packet.writeUInt8(OPCode.Rmi) // OPCode: 1 -> Rmi, 38 -> Compressed
		packet.writeUInt16LE(opCode)
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

		var encryptKey = member.p2pAESSessionKey

		// Encrypt
		var cipher = crypto.createCipheriv('aes-' + this.settings.encryptedMessageKeyLength + '-ecb', encryptKey, '').setAutoPadding(false)
		var encryptedData = Buffer.concat([cipher.update(decryptedData), cipher.final()])

		var packet = EncryptedReliable.serialize(EncryptMode.Secure, encryptedData)
	}

	this.client.write(ReliableRelay1.serialize(hosts, packet))
}

// RelayProxy Shit
ProudNetClient.prototype.sendProud = function(opCode, data) {
	var packet = new Packet(opCode)
	packet.writeBuffer(data)
	this.client.write(packet.finalize())
}

ProudNetClient.prototype.end = function() {
	if(this.state !== WorkerState.Connected) {
		return this.destroy()
	}

	this.state = WorkerState.Disconnecting

	var comment = Buffer.alloc(0)
	this.client.write(Rmi.serialize(OPCode.ShutdownTcp, ShutdownTcp.serialize(comment)))
	//log.debug('Packet Sent [ShutdownTcp]')

	// TODO: Auto close after 1 sec when no answer
	//setTimeout(function() {
	//	this.client.end()
	//}.bind(this), 1000)
}

ProudNetClient.prototype.destroy = function() {
	this.client.destroy()
}

ProudNetClient.prototype.getHostId = function() {
	return this.hostId
}

ProudNetClient.prototype.getServerConnectionState = function() {
	var state = ConnectionState.Disconnected
	if(this.state === WorkerState.IssueConnect) {
		state = ConnectionState.Connecting
	} else if(this.state === WorkerState.Connecting) {
		state = ConnectionState.Connecting
	} else if(this.state === WorkerState.JustConnected) {
		state = ConnectionState.Connected
	} else if(this.state === WorkerState.Connected) {
		state = ConnectionState.Connected
	} else if(this.state === WorkerState.Disconnecting) {
		state = ConnectionState.Disconnecting
	} else if(this.state === WorkerState.Disconnected) {
		state = ConnectionState.Disconnected
	}
	return state
}

ProudNetClient.prototype.getGroupByID = function(groupId) {
	for (var i = 0; i < this.groups.length; ++i) {
		if(this.groups[i].id === groupId) {
			return this.groups[i]
		}
	}

	return null
}

ProudNetClient.prototype.addGroup = function(group) {
	this.groups.push(group)
	return group
}

ProudNetClient.prototype.getSessionInGroup = function(group, hostId) {
	for (var i = 0; i < group.members.length; ++i) {
		if(group.members[i].hostId === hostId) {
			return group.members[i]
		}
	}

	return null
}

ProudNetClient.prototype.removeGroup = function(group) {
	this.groups.splice(this.groups.indexOf(group), 1)
}

ProudNetClient.prototype.removeMemberInGroup = function(group, member) {
	group.members.splice(group.members.indexOf(member), 1)
}

ProudNetClient.prototype.sendP2PGroupMemberLeave = function(hostIds, memberHostId, groupHostId) {
	log.debug('Send P2PGroupMemberLeave')
	log.debug('Member Host ID: ' + memberHostId)
	log.debug('Group Host ID: ' + groupHostId)

	var hosts = []

	for (var i = 0; i < hostIds.length; i++) {
		hosts.push({
			hostId: hostIds[i],
			frameNumber: 2281507973// TODO: Generate this shit for UDP.
		})
	}

	this.client.write(ReliableRelay1.serialize(hosts, Rmi.serialize(OPCode.P2PGroupMemberLeave, P2PGroupMemberLeave.serialize(memberHostId, groupHostId))))
}

//ProudNetClient.CompressMode = CompressMode
ProudNetClient.ErrorType = ErrorType

module.exports = ProudNetClient