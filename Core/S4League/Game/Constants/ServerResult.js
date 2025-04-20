module.exports = {
	GameServerError: 0,
	FailEnterRoom: 1,
	AlreadyPlaying: 2,
	NonExistingChannel: 3,
	ChannelLimitExceed: 4,
	ChannelEnter: 5,
	RoomAllowedPlayerNumberExceed: 6,
	RoomStartingGame: 7, // Wrong text in Client. Stupid S4 Devs.
	RoomChangingRules: 8,
	ChannelLeave: 9,
	PlayerCannotBeFound: 10,
	FailedCreatePlayer: 11,
	FailedDeletePlayer: 12,
	FailedSelectPlayer: 13,
	NickCreateSuccess: 14, // Not sure
	NicknameAlreadyUsed: 15,
	NicknameAvailable: 16, // Not sure
	PasswordError: 17,
	LoginSuccess: 18,
	LogSpecifiedIP: 19,
	LogForbidden: 20,
	UserAlreadyExist: 21,
	DBError: 22,
	FailedCreatePlayer2: 23,
	CannotEnterChannel: 24,
	RequiredChannelLicense: 25,
	WearingUnusableItem: 26,
	FailResellItemWearing: 27,
	//Unk: 28, // Nothing happens
	FailEnterRoom: 29,
	ImpossibleToEnterRoom: 30,
	ClanInfoUnavailable: 31,
	TaskCompensationError: 32,
	FailedToRequestTask: 33,
	ItemExchangeFailed: 34,
	ItemExchangeFailed2: 35,
	SelectPlayMode: 36,
	SelectGameMode: 37, // Not sure, Nothing happens
	EnteringFailed: 38, // Entering Failed. You should clear the low level first.
	AnotherSession: 39,
	NoClan: 40,
	//RoomCreationError: 56, // Trying to create a room in the channel overview
	AuthenticationFailed: 59
}