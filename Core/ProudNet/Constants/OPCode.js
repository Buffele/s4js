module.exports = {
	None: 0,
	Rmi: 1,
	UserMessage: 2,
	ConnectServerTimedout: 3,
	NotifyServerConnectionHint: 4,
	NotifyCSEncryptedSessionKey: 5,
	NotifyCSSessionKeySuccess: 6,
	NotifyServerConnectionRequestData: 7,
	NotifyProtocolVersionMismatch: 8,
	NotifyServerDeniedConnection: 9,
	NotifyServerConnectSuccess: 10,
	RequestStartServerHolepunch: 11,
	ServerHolepunch: 12,
	ServerHolepunchAck: 13,
	NotifyHolepunchSuccess: 14,
	NotifyClientServerUdpMatched: 15,
	PeerUdpServerHolepunch: 16,
	PeerUdpServerHolepunchAck: 17,
	PeerUdpNotifyHolepunchSuccess: 18,
	ReliableUdpFrame: 19, // TODO: Not implemented
	ReliableRelay1: 20,
	UnreliableRelay1: 21,
	UnreliableRelay1RelayDestListCompressed: 22,
	// LingerDataFrame1 // TODO: Not available?
	ReliableRelay2: 23,
	UnreliableRelay2: 24,
	LingerDataFrame2: 25,
	UnreliablePing: 26,
	SpeedHackDetectorPing: 27,
	UnreliablePong: 28,
	ArbitaryTouch: 29,
	PeerUdpPeerHolepunch: 30,
	PeerUdpPeerHolepunchAck: 31,
	P2PRequestIndirectServerTimeAndPing: 32,
	P2PReplyIndirectServerTimeAndPong: 33,
	S2CRoutedMulticast1: 34, // TODO: Not implemented
	S2CRoutedMulticast2: 35, // TODO: Not implemented
	EncryptedReliable: 36,
	EncryptedUnreliable: 37, // TODO: Not implemented
	Compressed: 38,
	RequestReceiveSpeedAtReceiverSideNoRelay: 39, // TODO: Not implemented
	ReplyReceiveSpeedAtReceiverSideNoRelay: 40, // TODO: Not implemented
	NotifyConnectionPeerRequestData: 41, // TODO: Not implemented
	NotifyCSP2PDisconnected: 42, // TODO: Not implemented
	NotifyConnectPeerRequestDataSucess: 43, // TODO: Not implemented
	NotifyCSConnectionPeerSuccess: 44, // TODO: Not implemented
	Ignore: 45,
	RequestServerConnectionHint: 46,
	PolicyRequest: 47, // TODO: Not implemented
	P2PReliablePing: 48,
	P2PReliablePong: 49,

	// TODO: RMI

	// C2S
	ReliablePing: 64001,
	P2PNotifyDirectP2PDisconnected: 64002,
	NotifyUdpToTcpFallbackByClient: 64003,
	P2PGroupMemberJoinAck: 64004,
	NotifyP2PHolepunchSuccess: 64005,
	ShutdownTcp: 64006,
	ShutdownTcpHandshake: 64007,
	NotifyLog: 64008,
	NotifyLogHolepunchFreqFail: 64009, // TODO: Unused
	NotifyNatDeviceName: 64010, // TODO: Unused
	NotifyPeerUdpSocketRestored: 64011,
	NotifyJitDirectP2PTriggered: 64012,
	NotifyNatDeviceNameDetected: 64013,
	NotifySendSpeed: 64014,
	ReportP2PPeerPing: 64015,
	C2SRequestCreateUdpSocket: 64016,
	C2SCreateUdpSocketAck: 64017,
	ReportC2CUdpMessageCount: 64018,
	ReportC2SUdpMessageTrialCount: 64019,

	// S2C
	P2PGroupMemberJoin: 64501,
	P2PGroupMemberJoinUnencrypted: 64502,
	P2PRecycleComplete: 64503,
	RequestP2PHolepunch: 64504,
	P2PNotifyDirectP2PDisconnected2: 64505,
	P2PGroupMemberLeave: 64506,
	NotifyDirectP2PEstablish: 64507,
	ReliablePong: 64508,
	EnableLog: 64509,
	DisableLog: 64510,
	NotifyUdpToTcpFallbackByServer: 64511,
	NotifySpeedHackDetectorEnabled: 64512,
	ShutdownTcpAck: 64513,
	RequestAutoPrune: 64514,
	RenewP2PConnectionState: 64515,
	NewDirectP2PConnection: 64516,
	RequestMeasureSendSpeed: 64517,
	S2CRequestCreateUdpSocket: 64518,
	S2CCreateUdpSocketAck: 64519,

	// C2C
	HolsterP2PHolepunchTrial: 65001,
	ReportUdpMessageCount: 65002,
	ReportServerTimeAndFrameRateAndPing: 65003,
	ReportServerTimeAndFrameRateAndPong: 65004
}