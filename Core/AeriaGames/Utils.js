var async = require('../node_modules/async')
var cheerio = require('../node_modules/cheerio')
//var jsdom = require('jsdom')
var request = require('../node_modules/request').defaults({ jar: true })

//const { JSDOM, VirtualConsole } = jsdom

var Logger = require('../Utils/Logger')

var log = new Logger('AeriaGamesUtils')

var cookieJar// = request.jar()

var incapsulaCookieObtained = false

function loadIncapsulaCookie(cb) {
	if(incapsulaCookieObtained) {
		return cb()
	}

	var called = false

	log.debug('Obtaining Incapsula Cookie...')

	var timeout = setTimeout(function() {
		if(called) {
			return
		}
		called = true

		log.warning('TimeOut...')

		return cb('TimeOut')
	}, 5000)

	request.get({
		url: 'https://www.aeriagames.com',
		headers: {
			'Host': 'www.aeriagames.com',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
			'Upgrade-Insecure-Requests': '1',
			'Cache-Control': 'max-age=0',
		},
		jar: cookieJar,
		strictSSL: false
	},
	function(err, httpResponse, body) {
		if(err) {
			return cb(err, null)
		}

		const virtualConsole = new VirtualConsole()

		virtualConsole.on('error', e => {
			console.log(e)	
		})

		virtualConsole.on('jsdomError', e => {
			if(e.type === 'not implemented') {
				if(called) {
					return
				}
				called = true

				clearTimeout(timeout)

				incapsulaCookieObtained = true

				log.debug('Incapsula Cookie successfully obtained!')
		
				return cb()
			}
		})

		const dom = new JSDOM(body, {
			url: 'https://www.aeriagames.com',
			referrer: 'https://www.aeriagames.com',
			contentType: 'text/html',
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
			runScripts: 'dangerously',
			resources: 'usable',
			virtualConsole: virtualConsole
		})
	})
}

module.exports = {
	authorize: function(user, password, cb, proxy) {
		async.waterfall([
			function(cb) {
				return cb()

				loadIncapsulaCookie(function(err) {
					return cb()
				})
			},
			function(cb) {
				log.info('Logging in...')
				request.post({
					url: 'https://www.aeriagames.com/dialog/oauth?response_type=code&client_id=a354ab1d0894ba2ecaac12bf5ad86fd905373a07f&redirect_uri=https://www.aeriagames.com/content_only_launcher&theme=api_ignite',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0'
					},
					form: {
						'edit[form_id]': 'account_login',
						'edit[id]': user,
						'edit[method]': 'oauth2',
						'edit[pass]': password
					},
					jar: cookieJar,
					strictSSL: false,
					proxy: proxy
				},
				function(err, httpResponse, body) {
					if(err) {
						return cb(err, null)
					}

					console.log(body)

					if(httpResponse.statusCode !== 302) {
						if(httpResponse.statusCode === 200) {
							return cb('Invalid Account Data!', null)
						} else {
							return cb('Unknown StatusCode ' + httpResponse.statusCode + ' for login', null)
						}
					}

					location = httpResponse.caseless.dict.location
					if(location === '/dialog/oauth/missing_params?theme=api_ag') {
						return cb('Unknown Login Response got.', null)
					}

					if(!location) {
						return cb(null, null)
					}

					return cb(err, location)
				})
			},
			function(location, cb) {
				log.info('Authenticating...')
				request.post({
					url: location,
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0'
					},
					jar: cookieJar,
					strictSSL: false,
					proxy: proxy
				},
				function(err, httpResponse) {
					if(err) {
						return cb(err, null)
					}

					if(httpResponse.statusCode === 302) {
						// Login success
					} else if(httpResponse.statusCode === 200) {
						// Authorizing
					} else {
						return cb('Unknown StatusCode ' + httpResponse.statusCode + ' for Auth', null)
					}

					try {
						code = httpResponse.caseless.dict.location.match(/code=.*/) + ''
						code = code.replace('code=', '')
						return cb(err, code)
					} catch(err) {
						log.info('Authorizing...')
						// Authorization...
						var authorizeHtml = cheerio.load(httpResponse.body)
						var url = authorizeHtml('#buttons a').attr('href')

						request.post({
							url: url,
							headers: {
								'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0'
							},
							jar: cookieJar,
							strictSSL: false,
							proxy: proxy
						},
						function(err, httpResponse) {
							if(err) {
								return cb(err, null)
							}

							code = httpResponse.caseless.dict.location.match(/code=.*/) + ''
							code = code.replace('code=', '')
							return cb(err, code)
						})
					}
				})
			}
		], function(err, result) {
			cb(err, result)
		})
	},
	register: function(user, password, email, year, month, day, cb, proxy) {
		cookieJar = request.jar()
		async.waterfall([
			function(cb) {
				return cb()

				loadIncapsulaCookie(function(err) {
					return cb()
				})
			},
			function(cb) {
				log.info('Register Step 1...')
				request.post({
					url: 'https://www.aeriagames.com/account/signup',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0'
					},
					form: {
						'edit[method]': '',
						'edit[destination]': '',
						'edit[mail]': email,
						'edit[birth][month]': month,
						'edit[birth][day]': day,
						'edit[birth][year]': year,
						'op': 'Play for free!',
						'edit[form_id]': 'account_signup'
					},
					jar: cookieJar,
					strictSSL: false,
					proxy: proxy
				},
				function(err, httpResponse) {
					if(err) {
						return cb(err, null)
					}

					if(httpResponse.statusCode !== 302) {
						if(httpResponse.statusCode === 200) {
							return cb('Failed to register the Account.', null) // TODO: Validation fails only?
						} else {
							return cb('Unknown StatusCode ' + httpResponse.statusCode + ' for register', null)
						}
					}

					return cb(null)
				})
			},
			function(cb) {
				log.info('Register Step 2...')
				request.post({
					url: 'https://www.aeriagames.com/account/signup2',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0'
					},
					form: {
						'edit[mail]': email,
						'edit[birth][year]': year,
						'edit[birth][month]': month,
						'edit[birth][day]': day,
						'edit[name]': user,
						'edit[pass]': password,
						'op': 'Play Free Now!',
						'edit[form_id]': 'account_signup2'
					},
					jar: cookieJar,
					strictSSL: false,
					proxy: proxy
				},
				function(err, httpResponse) {
					if(err) {
						return cb(err, null)
					}

					if(httpResponse.statusCode !== 302) {
						if(httpResponse.statusCode === 200) {
							return cb('Failed to register the Account.', null) // TODO: Validation fails only?
						} else {
							return cb('Unknown StatusCode ' + httpResponse.statusCode + ' for register', null)
						}
					}

					return cb(null, 'Success')
				})
			}
		], function(err, result) {
			cb(err, result)
		})
	}
}
