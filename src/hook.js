const cache = require('./cache')
const parse = require('url').parse
const crypto = require('./crypto')
const request = require('./request')
const match = require('./provider/match')
const querystring = require('querystring')

const hook = {
	request: {
		before: () => {},
		after: () => {},
	},
	connect: {
		before: () => {}
	},
	negotiate: {
		before: () => {}
	},
	target: {
		host: new Set(),
		path: new Set()
	}
}

hook.target.host = new Set([
	'music.163.com',
	'interface.music.163.com',
	'interface3.music.163.com',
	'apm.music.163.com',
	'apm3.music.163.com',
	// 'mam.netease.com',
	// 'api.iplay.163.com', // look living
	// 'ac.dun.163yun.com',
	// 'crash.163.com',
	// 'clientlog.music.163.com',
	// 'clientlog3.music.163.com'
])

hook.target.path = new Set([
	'/api/v3/playlist/detail',
	'/api/v3/song/detail',
	'/api/v6/playlist/detail',
	'/api/album/play',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/artist/songs',
	'/api/artist/top/song',
	'/api/v1/album',
	'/api/album/v3/detail',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	'/api/song/enhance/player/url/v1',
	'/api/song/enhance/download/url',
	'/api/song/enhance/privilege',
	'/batch',
	'/api/batch',
	'/api/v1/search/get',
	'/api/v1/search/song/get',
	'/api/search/complex/get',
	'/api/cloudsearch/pc',
	'/api/v1/playlist/manipulate/tracks',
	'/api/song/like',
	'/api/v1/play/record',
	'/api/playlist/v4/detail',
	'/api/v1/radio/get',
	'/api/v1/discovery/recommend/songs'
])

const domainList = [
	'music.163.com', 
	'music.126.net',
	'iplay.163.com',
	'look.163.com',
	'y.163.com',
]

hook.request.before = ctx => {
	const {req} = ctx
	req.url = (req.url.startsWith('http://') ? '' : (req.socket.encrypted ? 'https:' : 'http:') + '//' + (domainList.some(domain => (req.headers.host || '').endsWith(domain)) ? req.headers.host : null)) + req.url
	const url = parse(req.url)
	if ([url.hostname, req.headers.host].some(host => host.includes('music.163.com'))) ctx.decision = 'proxy'
	if ([url.hostname, req.headers.host].some(host => hook.target.host.has(host)) && req.method == 'POST' && (url.path == '/api/linux/forward' || url.path.startsWith('/eapi/'))) {
		return request.read(req)
		.then(body => req.body = body)
		.then(body => {
			if ('x-napm-retry' in req.headers) delete req.headers['x-napm-retry']
			req.headers['X-Real-IP'] = '118.88.88.88'
			if (req.url.includes('stream')) return // look living eapi can not be decrypted
			if (body) {
				let data = null
				const netease = {}
				netease.pad = (body.match(/%0+$/) || [''])[0]
				netease.forward = (url.path == '/api/linux/forward')
				if (netease.forward) {
					data = JSON.parse(crypto.linuxapi.decrypt(Buffer.from(body.slice(8, body.length - netease.pad.length), 'hex')).toString())
					netease.path = parse(data.url).path
					netease.param = data.params
				}
				else {
					data = crypto.eapi.decrypt(Buffer.from(body.slice(7, body.length - netease.pad.length), 'hex')).toString().split('-36cd479b6b5-')
					netease.path = data[0]
					netease.param = JSON.parse(data[1])
				}
				netease.path = netease.path.replace(/\/\d*$/, '')
				ctx.netease = netease
				// console.log(netease.path, netease.param)

				if (netease.path == '/api/song/enhance/download/url')
					return pretendPlay(ctx)
			}
		})
		.catch(error => console.log(error, req.url))
	}
	else if ((hook.target.host.has(url.hostname)) && (url.path.startsWith('/weapi/') || url.path.startsWith('/api/'))) {
		req.headers['X-Real-IP'] = '118.88.88.88'
		ctx.netease = {web: true, path: url.path.replace(/^\/weapi\//, '/api/').replace(/\?.+$/, '').replace(/\/\d*$/, '')}
	}
	else if (req.url.includes('package')) {
		try {
			const data = req.url.split('package/').pop().split('/')
			const url = parse(crypto.base64.decode(data[0]))
			const id = data[1].replace(/\.\w+/, '')
			req.url = url.href
			req.headers['host'] = url.hostname
			req.headers['cookie'] = null
			ctx.package = {id}
			ctx.decision = 'proxy'
			// if (url.href.includes('google'))
			// 	return request('GET', req.url, req.headers, null, parse('http://127.0.0.1:1080'))
			// 	.then(response => (ctx.res.writeHead(response.statusCode, response.headers), response.pipe(ctx.res)))
		}
		catch(error) {
			ctx.error = error
			ctx.decision = 'close'
		}
	}
}

hook.request.after = ctx => {
	const {req, proxyRes, netease, package} = ctx
	if (req.headers.host === 'tyst.migu.cn' && proxyRes.headers['content-range'] && proxyRes.statusCode === 200) proxyRes.statusCode = 206
	if (netease && hook.target.path.has(netease.path) && proxyRes.statusCode == 200) {
		return request.read(proxyRes, true)
		.then(buffer => buffer.length ? proxyRes.body = buffer : Promise.reject())
		.then(buffer => {
			const patch = string => string.replace(/([^\\]"\s*:\s*)(\d{16,})(\s*[}|,])/g, '$1"$2L"$3') // for js precision
			try {
				netease.encrypted = false
				netease.jsonBody = JSON.parse(patch(buffer.toString()))
			}
			catch(error) {
				netease.encrypted = true
				netease.jsonBody = JSON.parse(patch(crypto.eapi.decrypt(buffer).toString()))
			}

			if (new Set([401, 512]).has(netease.jsonBody.code) && !netease.web) {
				if (netease.path.includes('manipulate')) return tryCollect(ctx)
				else if (netease.path == '/api/song/like') return tryLike(ctx)
			}
			else if (netease.path.includes('url')) return tryMatch(ctx)
		})
		.then(() => {
			['transfer-encoding', 'content-encoding', 'content-length'].filter(key => key in proxyRes.headers).forEach(key => delete proxyRes.headers[key])

			const inject = (key, value) => {
				if (typeof(value) === 'object' && value != null) {
					if ('fee' in value) value['fee'] = 0
					if ('st' in value && 'pl' in value && 'dl' in value && 'subp' in value) { // batch modify
						value['st'] = 0
						value['subp'] = 1
						value['pl'] = (value['pl'] == 0) ? 320000 : value['pl']
						value['dl'] = (value['dl'] == 0) ? 320000 : value['dl']
					}
				}
				return value
			}

			let body = JSON.stringify(netease.jsonBody, inject)
			body = body.replace(/([^\\]"\s*:\s*)"(\d{16,})L"(\s*[}|,])/g, '$1$2$3') // for js precision
			proxyRes.body = (netease.encrypted ? crypto.eapi.encrypt(Buffer.from(body)) : body)
		})
		.catch(error => error ? console.log(error, req.url) : null)
	}
	else if (package) {
		if (new Set([201, 301, 302, 303, 307, 308]).has(proxyRes.statusCode)) {
			return request(req.method, parse(req.url).resolve(proxyRes.headers.location), req.headers)
			.then(response => ctx.proxyRes = response)
		}
		else if (/p\d+c*.music.126.net/.test(req.url)) {
			proxyRes.headers['content-type'] = 'audio/*'
		}
	}
}

hook.connect.before = ctx => {
	const {req} = ctx
	const url = parse('https://' + req.url)
	if ([url.hostname, req.headers.host].some(host => hook.target.host.has(host))) {
		if (url.port == 80) {
			req.url = `${global.address || 'localhost'}:${global.port[0]}`
			req.local = true
		}
		else if (global.port[1]) {
			req.url = `${global.address || 'localhost'}:${global.port[1]}`
			req.local = true
		}
		else {
			ctx.decision = 'blank'
		}
	}
	else if (url.href.includes(global.endpoint)) ctx.decision = 'proxy'
}

hook.negotiate.before = ctx => {
	const {req, socket, decision} = ctx
	const url = parse('https://' + req.url)
	const target = hook.target.host
	if (req.local || decision) return
	if (target.has(socket.sni) && !target.has(url.hostname)) {
		target.add(url.hostname)
		ctx.decision = 'blank'
	}
}

const pretendPlay = ctx => {
	const {req, netease} = ctx
	const turn = 'http://music.163.com/api/song/enhance/player/url'
	let query = null
	if (netease.forward) {
		const {id, br} = netease.param
		netease.param = {ids: `["${id}"]`, br}
		query = crypto.linuxapi.encryptRequest(turn, netease.param)
	}
	else {
		const {id, br, e_r, header} = netease.param
		netease.param = {ids: `["${id}"]`, br, e_r, header}
		query = crypto.eapi.encryptRequest(turn, netease.param)
	}
	req.url = query.url
	req.body = query.body + netease.pad
}

const tryCollect = ctx => {
	const {req, netease} = ctx
	const {trackIds, pid, op} = netease.param
	const trackId = (Array.isArray(trackIds) ? trackIds : JSON.parse(trackIds))[0]
	return request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=${op}`).then(response => response.json())
	.then(jsonBody => {
		netease.jsonBody = jsonBody
	})
	.catch(() => {})
}

const tryLike = ctx => {
	const {req, netease} = ctx
	const {trackId} = netease.param
	let pid = 0, userId = 0
	return request('GET', 'http://music.163.com/api/v1/user/info', req.headers).then(response => response.json())
	.then(jsonBody => {
		userId = jsonBody.userPoint.userId
		return request('GET', `http://music.163.com/api/user/playlist?uid=${userId}&limit=1`, req.headers).then(response => response.json())
	})
	.then(jsonBody => {
		pid = jsonBody.playlist[0].id
		return request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`).then(response => response.json())
	})
	.then(jsonBody => {
		if (new Set([200, 502]).has(jsonBody.code)) {
			netease.jsonBody = {code: 200, playlistId: pid}
		}
	})
	.catch(() => {})
}

const computeHash = task => request('GET', task.url).then(response => crypto.md5.pipe(response))

const tryMatch = ctx => {
	const {req, netease} = ctx
	const {jsonBody} = netease
	let tasks = [], target = 0

	const inject = item => {
		item.flag = 0
		if ((item.code != 200 || item.freeTrialInfo) && (target == 0 || item.id == target)) {
			return match(item.id)
			.then(song => {
				item.type = song.br === 999000 ? 'flac' : 'mp3'
				item.url = global.endpoint ? `${global.endpoint}/package/${crypto.base64.encode(song.url)}/${item.id}.${item.type}` : song.url
				item.md5 = song.md5 || crypto.md5.digest(song.url)
				item.br = song.br || 128000
				item.size = song.size
				item.code = 200
				item.freeTrialInfo = null
				return song
			})
			.then(song => {
				if (!netease.path.includes('download') || song.md5) return
				const newer = (base, target) => {
					const difference =
						Array.from([base, target])
						.map(version => version.split('.').slice(0, 3).map(number => parseInt(number) || 0))
						.reduce((aggregation, current) => !aggregation.length ? current.map(element => [element]) : aggregation.map((element, index) => element.concat(current[index])), [])
						.filter(pair => pair[0] != pair[1])[0]
					return !difference || difference[0] <= difference[1]
				}
				const limit = {android: '0.0.0', osx: '0.0.0'}
				const task = {key: song.url.replace(/\?.*$/, '').replace(/(?<=kugou\.com\/)\w+\/\w+\//, '').replace(/(?<=kuwo\.cn\/)\w+\/\w+\/resource\//, ''), url: song.url}
				try {
					let {header} = netease.param
					header = typeof(header) === 'string' ? JSON.parse(header) : header
					const cookie = querystring.parse(req.headers.cookie.replace(/\s/g, ''), ';')
					const os = header.os || cookie.os, version = header.appver || cookie.appver
					if (os in limit && newer(limit[os], version))
						return cache(computeHash, task, 7 * 24 * 60 * 60 * 1000).then(value => item.md5 = value)
				}
				catch(e) {}
			})
			.catch(() => {})
		}
		else if (item.code == 200 && netease.web) {
			item.url = item.url.replace(/(m\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net')
		}
	}

	if (!Array.isArray(jsonBody.data)) {
		tasks = [inject(jsonBody.data)]
	}
	else if (netease.path.includes('download')) {
		jsonBody.data = jsonBody.data[0]
		tasks = [inject(jsonBody.data)]
	}
	else {
		target = netease.web ? 0 : parseInt(((Array.isArray(netease.param.ids) ? netease.param.ids : JSON.parse(netease.param.ids))[0] || 0).toString().replace('_0', '')) // reduce time cost
		tasks = jsonBody.data.map(item => inject(item))
	}
	return Promise.all(tasks).catch(() => {})
}

module.exports = hook