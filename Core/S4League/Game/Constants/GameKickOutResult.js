module.exports = {
	OK: 1,
	NotEnoughPen: 2, // "Insufficient Fund to proceed the vote."
	AlreadyRunning: 3, // "Vote is currently running now."
	NotEnoughPlayers: 4, // "Not enough players to vote."
	PlayerNotExists: 5, // "Player is not existing in this room."
	PlayerIsGM: 6 // "Can't kick out the GM"
}