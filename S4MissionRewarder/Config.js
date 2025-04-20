module.exports = {
	reconnectDelay: 1,
	authServerConnectTimeOut: 5000,
	gameServerConnectTimeOut: 500,
	gameServerLoginTimeOut: 2000,
	auth: {
		ip: '62.138.245.113',
		port: 28002
	},
	game: {
		servers: [
			'62.138.245.101', // Official S4 Game Server - English 1
			'62.138.245.111', // Official S4 Game Server - English 2
			'62.138.245.98', // Official S4 Game Server - English 3
			'62.138.245.102', // Official S4 Game Server - German 1
			'62.138.245.109', // Official S4 Game Server - French
			'62.138.245.96', // Official S4 Game Server - German 2
			'62.138.245.108' // Official S4 Game Server - Turkish
		],
		port: 28008
	}
}
