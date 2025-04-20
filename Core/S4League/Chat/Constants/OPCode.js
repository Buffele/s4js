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
	C2S: 16001,
	S2C: 15001
}
*/

// C2S | 24
// S2C | 37

var Start = {
	C2S: 15001,
	S2C: 16001
}

// C2S | 24
generateOpCodes(Start.C2S, [
	'CLoginReq',
	'CDenyActionReq',
	'CFriendActionReq',
	'CCombiCheckNameReq',
	'CCombiActionReq',
	'CUserDataOneReq',
	'UserDataThreeAck',
	'CMessageChatReq',
	'CMessageWhisperChatReq',
	'CRoomInvitationPlayerReq',
	'CNoteListReq',
	'CNoteSendReq',
	'CNoteReadReq',
	'CNoteDeleteReq',
	'CNoteCountReq',
	'COptionSaveCommunityReq',
	'COptionSaveBinaryReq',
	'CNoteRejectImportuneReq',
	'CClubNoteSendReq',
	'CClubMemberListReq',
	'CClubClubMemberInfoReq2',
	'CClubMemberListReq2',
	'CClubNoteSendReq2',
	'CChannelListReq' // 15024
])

// S2C | 37
generateOpCodes(Start.S2C, [
	'SLoginAck',
	'SFriendActionAck',
	'SFriendListAck',
	'SCombiActionAck',
	'SCombiListAck',
	'SCombiCheckNameAck',
	'SDenyActionAck',
	'SDenyListAck',
	'SChannelPlayerListAck',
	'SChannelEnterPlayerAck',
	'SChannelLeavePlayerAck',
	'SMessageChatAck',
	'SMessageWhisperChatAck',
	'SRoomInvitationPlayerAck',
	'SClanMemberListAck',
	'SNoteListAck',
	'SNoteSendAck',
	'SNoteReadAck',
	'SNoteDeleteAck',
	'SNoteErrorAck',
	'SNoteCountAck',
	'SPlayerInfoAck',
	'SPlayerPositionAck',
	'SPlayerPlayerInfoListAck',
	'UserDataTwoReq',
	'SUserDataFourAck',
	'SClanChangeNoticeAck',
	'SNoteRejectImportuneAck',
	'SClubSystemMessage',
	'SClubNewsRemind',
	'SClubNoteSendAck',
	'SClubMemberListAck',
	'SClubMemberLoginStateAck',
	'SChannelPlayerNameTagListAck',
	'SClubClubMemberInfoAck2',
	'SClubMemberListAck2',
	'SBroadCastClubClose' // 16037
])

module.exports = opCode