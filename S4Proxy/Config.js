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
			ip: '43.152.115.81',
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
					ip: '43.152.115.81',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28004,
				},
				target: {
					ip: '43.152.115.81',
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
		{
			name: '[Proxy] The Union',
			groupId: 2,
			game: {
				source: {
					ip: '127.0.0.1',
					port: 28007,
				},
				target: {
					ip: '43.157.55.172',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28008,
				},
				target: {
					ip: '43.157.55.172',
					port: 7948,
				},
			},
		},
		{
			name: '[Proxy] The World',
			groupId: 3,
			game: {
				source: {
					ip: '127.0.0.1',
					port: 28009,
				},
				target: {
					ip: '43.128.238.101',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28010,
				},
				target: {
					ip: '43.128.238.101',
					port: 7948,
				},
			},
		},
		{
			name: '[Proxy] Imperials',
			groupId: 4,
			game: {
				source: {
					ip: '127.0.0.1',
					port: 28011,
				},
				target: {
					ip: '43.130.99.24',
					port: 7950,
				},
			},
			chat: {
				source: {
					ip: '127.0.0.1',
					port: 28012,
				},
				target: {
					ip: '43.130.99.24',
					port: 7948,
				},
			},
		},
	],
}
