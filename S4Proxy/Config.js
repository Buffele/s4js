module.exports = {
	http: {
		ip: '127.0.0.1',
		port: 3000
	},
	auth: {
		source: {
			ip: '127.0.0.1',
			port: 28002
		},
		target: {
			ip: '83.220.134.84', // Official S4 Auth Server
			//ip: '200.42.138.68', // Latino Auth Server (Yuisy)
			//ip: '125.5.20.20', // Philippines Auth Server (Valofe)
			port: 28002
		}
	},
	chat: {
		source: {
			ip: '127.0.0.1',
			port: 28013
		},
		target: {
			//ip: '83.220.134.72', // English 1 Chat
			ip: '83.220.134.73', // German 1 Chat
			//ip: '200.42.138.64', // S4_Chat_1 | Latino S4 (Yuisy)
			//ip: '125.5.20.76', // S4_Blitz Chat
			port: 28013
		}
	},
	game: {
		source: {
			ip: '127.0.0.1',
			port: 28008
		},
		target: {
			//ip: '83.220.134.72', // English 1 Game
			ip: '83.220.134.73', // German 1 Game
			//ip: '200.42.138.64', // S4_Game_1 | Latino S4 (Yuisy)
			//ip: '125.5.20.76', // S4_Blitz
			port: 28008
		}
	}
}
