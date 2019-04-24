const parse = require('url').parse
const crypto = require('./crypto')
const request = require('./request')
const match = require('./provider/match')

const hook = {
	request: {
		before: () => {},
		after: () => {},
	},
	connect: {
		before: () => {}
	},
	target: {
		host: [],
		path: []
	}
}

hook.target.host = [
	'music.163.com',
	'interface.music.163.com',
	'apm.music.163.com',
	'mam.netease.com',
	// 'crash.163.com',
	// 'clientlog.music.163.com'
]

hook.target.path = [
	'/api/v3/playlist/detail',
	'/api/v3/song/detail',
	'/api/v6/playlist/detail',
	// '/api/playlist/detail/dynamic',
	'/api/album/play',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/artist/songs',
	'/api/v1/album',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	'/api/song/enhance/player/url/v1',
	'/api/song/enhance/download/url',
	'/batch',
	'/api/batch',
	'/api/v1/search/get',
	'/api/cloudsearch/pc',
	'/api/v1/playlist/manipulate/tracks',
	'/api/song/like',
	'/api/v1/play/record',
	'/api/playlist/v4/detail'
]

hook.request.before = ctx => {
	const req = ctx.req
	req.url = (req.url.startsWith('http://') ? '' : (req.socket.encrypted ? 'https:' : 'http:') + '//music.163.com') + req.url
	const url = parse(req.url)
	if((hook.target.host.includes(url.hostname)) && req.method == 'POST' && (url.path == '/api/linux/forward' || url.path.startsWith('/eapi/'))){
		return request.read(req)
		.then(body => {
			req.body = body
			req.headers['X-Real-IP'] = '118.88.88.88'
			if(body){
				let data = null
				let netease = {}
				netease.pad = (body.match(/%0+$/) || [''])[0]
				netease.forward = (url.path == '/api/linux/forward')
				if(netease.forward){
					data = JSON.parse(crypto.linuxapi.decrypt(Buffer.from(body.slice(8, body.length - netease.pad.length), 'hex')).toString())
					netease.path = parse(data.url).path
					netease.param = data.params
				}
				else{
					data = crypto.eapi.decrypt(Buffer.from(body.slice(7, body.length - netease.pad.length), 'hex')).toString().split('-36cd479b6b5-')
					netease.path = data[0]
					netease.param = JSON.parse(data[1])
				}
				netease.path = netease.path.replace(/\/\d*$/, '')
				ctx.netease = netease
				// console.log(netease.path, netease.param)

				if(netease.path == '/api/song/enhance/download/url')
					return pretendPlay(ctx)
			}
		})
		.catch(error => {
			console.log(error)
		})
	}
	if((hook.target.host.includes(url.hostname)) && url.path.startsWith('/weapi/')){
		ctx.netease = {web: true, path: url.path.replace(/^\/weapi\//, '/api/').replace(/\?.+$/, '').replace(/\/\d*$/, '')}
	}
	else if(req.url.includes('package')){
		try{
			let data = req.url.split('package/').pop().split('/')
			let url = parse(crypto.base64.decode(data[0]))
			let id = data[1].replace('.mp3', '')
			req.url = url.href
			req.headers['host'] = url.hostname
			ctx.package = {id}
			ctx.decision = 'proxy'
		}
		catch(error){
			ctx.error = error
			ctx.decision = 'close'
		}
	}
}

hook.request.after = ctx => {
	const netease = ctx.netease
	const package = ctx.package
	const proxyRes = ctx.proxyRes
	if(netease && hook.target.path.includes(netease.path) && proxyRes.statusCode == 200){
		return request.read(proxyRes, true)
		.then(buffer => {
			proxyRes.body = buffer
			try{
				netease.encrypted = false
				netease.jsonBody = JSON.parse(buffer.toString())
			}
			catch(error){
				netease.encrypted = true
				netease.jsonBody = JSON.parse(crypto.eapi.decrypt(buffer).toString())
			}

			if(netease.path.includes('manipulate') && [401, 512].includes(netease.jsonBody.code) && !netease.web)
				return tryCollect(ctx)
			else if(netease.path == '/api/song/like' && [401, 512].includes(netease.jsonBody.code) && !netease.web)
				return tryLike(ctx)
			else if(netease.path.includes('url'))
				return tryMatch(ctx)
		})
		.then(() => {
			if('transfer-encoding' in proxyRes.headers) delete proxyRes.headers['transfer-encoding']
			if('content-encoding' in proxyRes.headers) delete proxyRes.headers['content-encoding']
			if('content-length' in proxyRes.headers) delete proxyRes.headers['content-length']

			const inject = (key, value) => {
				if(typeof(value) === 'object' && value != null){
					if('pic_str' in value && 'pic' in value) // for js precision
						value['pic'] = value['pic_str']
					if('coverImgId_str' in value && 'coverImgId' in value) // for js precision
						value['coverImgId'] = value['coverImgId_str']
					if('fee' in value) value['fee'] = 0
					if('cp' in value) value['cp'] = 0
					if('st' in value && 'pl' in value && 'dl' in value && 'subp' in value){ // batch modify
						value['st'] = 0
						value['subp'] = 1
						value['pl'] = (value['pl'] == 0) ? 320000 : value['pl']
						value['dl'] = (value['dl'] == 0) ? 320000 : value['dl']
					}
				}
				return value
			}

			let body = JSON.stringify(netease.jsonBody, inject)
			body = body.replace(/"pic":"(\d+)"/g, '"pic":$1')
			body = body.replace(/"coverImgId":"(\d+)"/g, '"coverImgId":$1')
			proxyRes.body = (netease.encrypted ? crypto.eapi.encrypt(Buffer.from(body)) : body)
		})
	}
	else if(package){
		if(/p\d+c*.music.126.net/.test(ctx.req.url)){
			proxyRes.headers['content-type'] = 'audio/mpeg'
		}
	}
}

hook.connect.before = ctx => {
	let url = parse('https://' + ctx.req.url)
	if(hook.target.host.includes(url.hostname)){
		if(url.port == 80){
			ctx.req.url = `localhost:${global.port[0]}`
			ctx.req.local = true
		}
		else if(global.port[1]){
			ctx.req.url = `localhost:${global.port[1]}`
			ctx.req.local = true
		}
		else{
			ctx.decision = 'blank'
		}
	}
}

const pretendPlay = ctx => {
	const req = ctx.req
	const netease = ctx.netease
	let turn = 'http://music.163.com/api/song/enhance/player/url'
	let query = null
	if(netease.linux){
		netease.param = {
			ids: '["' + netease.param.id + '"]',
			br: '320000'
		}
		query = crypto.linuxapi.encryptRequest(turn, netease.param)
	}
	else{
		netease.param = {
			ids: '["' + netease.param.id + '"]',
			br: '320000',
			e_r: netease.param.e_r,
			header: netease.param.header
		}
		query = crypto.eapi.encryptRequest(turn, netease.param)
	}
	req.url = query.url
	req.body = query.body + netease.pad
}

const tryCollect = ctx => {
	const req = ctx.req
	const netease = ctx.netease
	let trackId = (netease.param.trackIds instanceof Array ? netease.param.trackIds : JSON.parse(netease.param.trackIds))[0]
	return request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers, `trackIds=[${trackId},${trackId}]&pid=${netease.param.pid}&op=${netease.param.op}`).then(response => response.json())
	.then(jsonBody => {
		netease.jsonBody = jsonBody
	})
	.catch(() => {})
}

const tryLike = ctx => {
	const req = ctx.req
	const netease = ctx.netease
	let pid, userId, trackId = netease.param.trackId
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
		if(jsonBody.code == 200 || jsonBody.code == 502){
			netease.jsonBody = {code: 200, playlistId: pid}
		}
	})
	.catch(() => {})
}

const tryMatch = ctx => {
	const netease = ctx.netease
	const jsonBody = netease.jsonBody
	let tasks = [], target = 0

	const inject = item => {
		item.flag = 0
		if(item.code != 200 && (target == 0 || item.id == target)){
			return match(item.id)
			.then(song => {
				item.url = `http://music.163.com/package/${crypto.base64.encode(song.url)}/${item.id}.mp3`
				item.md5 = song.md5
				item.size = song.size
				item.code = 200
				item.br = 320000
				item.type = 'mp3'
			})
			.catch(() => {})
		}
	}

	if(!jsonBody.data instanceof Array){
		tasks = [inject(jsonBody.data)]
	}
	else if(netease.path.includes('download')){
		jsonBody.data = jsonBody.data[0]
		tasks = [inject(jsonBody.data)]
	}
	else{
		target = netease.web ? 0 : parseInt((netease.param.ids instanceof Array ? netease.param.ids : JSON.parse(netease.param.ids))[0].toString().replace('_0', '')) // reduce time cost
		tasks = jsonBody.data.map(item => inject(item))
	}
	return Promise.all(tasks).catch(() => {})
}

module.exports = hook