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
	C2S: 5101,
	S2C: 5001
}
*/

var Start = {
	C2S: 5001,
	S2C: 5101
}

// C2S | 10
generateOpCodes(Start.C2S, [
	'CLoginKRReq',
    'CLoginEUReq',
    'CLoginJPReq',
	'CServerListReq',
    'COptionVersionCheckReq',
    'CAuthInTHReq',
    'CGameDataXBNReq',
	'CLoginPHReq',
	'CCNSaltReq',
	'CLoginCNReq' // 5010
])

// S2C | 11
generateOpCodes(Start.S2C, [
	'SLoginKRAck',
    'SLoginEUAck',
    'SLoginJPAck',
    'SServerListAck',
    'SOptionVersionCheckAck',
    'SAuthInTHAck',
    'SGameDataXBNAck',
	'SRefreshAeriaTokenInfoAck',
	'SLoginPHAck',
	'SCNSaltAck',
	'SLoginCNAck' // 5111
])

module.exports = opCode
