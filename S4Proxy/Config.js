module.exports = {
	http: {
		ip: '127.0.0.1',
		port: 3000,
	},
	account: {
		id: 4,
		name: 'Test',
	},
	auth: {
		source: {
			ip: '127.0.0.1',
			port: 28002,
		},
		target: {
			ip: '43.157.55.180',
			port: 28002,
		},
	},
	servers: [
		{
			name: '[Proxy] Leaguers',
			groupId: 0,
			game: {
				source: {
					ip: '127.0.0.1',
					port: 28003,
				},
				target: {
					ip: '43.157.55.180',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28004,
				},
				target: {
					ip: '43.157.55.180',
					port: 7948,
				},
			},
		},
		{
			name: '[Proxy] Dominic',
			groupId: 1,
			game: {
				source: {
					ip: '127.0.0.1',
					port: 28005,
				},
				target: {
					ip: '43.157.97.91',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28006,
				},
				target: {
					ip: '43.157.97.91',
					port: 7948,
				},
			},
		},
	],
}
