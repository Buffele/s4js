//var Logger = require('../../../Utils/Logger')
//var log = new Logger('OPCode', true)

function generateOpCodes(start, opCodes) {
	if(typeof start !== 'number') {
		throw Error('Start Value is not a number!')
	}

	for (var i = 0; i < opCodes.length; i++) {
		// Check if this OpCode exists already
		if(opCode[opCodes[i]] !== undefined) {
			throw Error('OPCode "' + opCodes[i] + '" already exists.')
		}
		//log.debug(opCodes[i] + ' = ' + start + ',')
		// TODO: Check if this number is in use already
		opCode[opCodes[i]] = start
		start++
	}
}

var opCode = { }

// Until 22.11.2016 | 1235 ?
/*
var Start = {
	C2S: 12001,
	S2C: 10001
}
*/

var Start = {
	C2S: 10001,
	S2C: 11001
}

// C2S | 2
generateOpCodes(Start.C2S, [
	'CLoginReq',
    'CNotifyInfoReq' // 10002
])

// S2C | 2
generateOpCodes(Start.S2C, [
	'SLoginAck',
    'SEnterPlayerAck' // 11002
])

// C2C | 11
generateOpCodes(20017, [
	'Chat',
	'P2PEventMessage',
	'ChangeTarget', // TODO: Unused
	'ArcadeSync', // TODO: Unused
	'AcardeSyncReq', // TODO: Unused
	'WaitingRoomActionSync',
	'SyncWatingRoomPlayerAction', // TODO: Unused
	'FootBallBallSync',
	'Packet',
	'MonsterSync', // TODO: Unused
	'MonsterCommand' // TODO: Unused
])

module.exports = opCode
