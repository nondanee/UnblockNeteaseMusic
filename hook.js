const parse = require('url').parse
const request = require('./request')
const crypto = require('./crypto')
const search = require('./provider/search')

const host = [
	'music.163.com',
	'interface.music.163.com',
	'apm.music.163.com',
	'mam.netease.com',
	'clientlog.music.163.com'
]

const path = [
	'/api/v3/playlist/detail',
	'/api/v3/song/detail',
	'/api/v6/playlist/detail',
	// '/api/playlist/detail/dynamic',
	'/api/album/play',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/album',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	'/api/song/enhance/download/url',
	'/batch',
	'/api/batch',
	'/api/v1/search/get',
	'/api/cloudsearch/pc',
	'/api/v1/playlist/manipulate/tracks',
	'/api/song/like'
]

const before = ctx => {
	const url = ctx.url
	const req = ctx.req
	const query = ctx.query
	return new Promise((resolve, reject) => {
		if((host.includes(url.hostname)) && req.method == 'POST' && (url.path == '/api/linux/forward' || url.path.startsWith('/eapi/'))){
			request.read(req).then(body => {
				req.headers['X-Real-IP'] = '118.88.88.88'
				req.body = body
				if(body){
					let data, forward = (url.path == '/api/linux/forward'), pad = body.search(/%0+$/)
					pad = (pad == -1 ? body.length : pad)
					if(forward){
						data = JSON.parse(crypto.linuxapi.decrypt(Buffer.from(body.slice(8, pad), 'hex')).toString())
						query.path = parse(data.url).path
						query.param = data.params
					}
					else{
						data = crypto.eapi.decrypt(Buffer.from(body.slice(7, pad), 'hex')).toString().split('-36cd479b6b5-')
						query.path = data[0]
						query.param = JSON.parse(data[1])
					}
					query.path = query.path.replace(/\/\d*$/, '')
					
					let turn = '/api/song/enhance/download/url'
					if(query.path == turn){
						if(forward){
							query.param = {
								ids: '["' + query.param.id + '"]',
								br: '320000'
							}
							data.url = data.url.replace('download', 'player')
							data.params = query.param
							let eparams = crypto.linuxapi.encryptRequest(data)
							req.body = 'eparams=' + eparams + body.slice(pad)
						}
						else{
							query.param = {
								ids: '["' + query.param.id + '"]',
								br: '320000',
								e_r: query.param.e_r,
								header: query.param.header
							}
							let params = crypto.eapi.encryptRequest(turn.replace('download', 'player'), query.param)
							ctx.url.parse(turn.replace('download', 'player').replace('api', 'eapi'))
							req.body = 'params=' + params + body.slice(pad)
						}
					}
				}
				resolve()
			})
			.catch(error => {
				ctx.error = error
				reject()
			})
		}
		else{
			resolve()
		}
	})
}

const after = ctx => {
	const req = ctx.req
	const query = ctx.query
	const proxyRes = ctx.proxyRes
	return new Promise((resolve, reject) => {
		if(path.includes(query.path) && proxyRes.statusCode == 200){
			request.read(proxyRes, true).then(buffer => {
				if('transfer-encoding' in proxyRes.headers) delete proxyRes.headers['transfer-encoding']
				if('content-encoding' in proxyRes.headers) delete proxyRes.headers['content-encoding']
				if('content-length' in proxyRes.headers) delete proxyRes.headers['content-length']
				
				let encrypted, jsonBody
				try{
					encrypted = false
					jsonBody = JSON.parse(buffer.toString())
				}
				catch(error){
					encrypted = true
					jsonBody = JSON.parse(crypto.eapi.decrypt(buffer).toString())
				}

				const done = () => {
					const inject = (key, value) => { 
						if(typeof(value) === 'object' && value != null){
							if('pic_str' in value && 'pic' in value) //for js precision
								value['pic'] = value['pic_str']
							if('coverImgId_str' in value && 'coverImgId' in value) //for js precision
								value['coverImgId'] = value['coverImgId_str']
							if('st' in value && 'pl' in value && 'dl' in value && 'subp' in value){ // batch modify
								value['st'] = 0
								value['subp'] = 1
								value['pl'] = (value['pl'] == 0) ? 320000 : value['pl']
								value['dl'] = (value['dl'] == 0) ? 320000 : value['dl']
							}
						}
						return value
					}

					let body = JSON.stringify(jsonBody, inject)
					body = body.replace(/"pic":"(\d+)"/g, '"pic":$1')
					body = body.replace(/"coverImgId":"(\d+)"/g, '"coverImgId":$1')
					proxyRes.body = (encrypted ? crypto.eapi.encrypt(Buffer.from(body)) : body)
					resolve()
				}

				if(query.path.includes('manipulate')){
					if(jsonBody.code == 401){
						let trackId = JSON.parse(query.param.trackIds)[0]
						request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers,
							`trackIds=[${trackId},${trackId}]&pid=${query.param.pid}&op=${query.param.op}`
						)
						.then(response => {
							jsonBody = JSON.parse(response.body)
							done()
						})
						.catch(() => {
							done()
						})
					}
					else{
						done()
					}
				}
				else if(query.path == '/api/song/like'){
					if(jsonBody.code == 401){
						let pid, userId, trackId = query.param.trackId
						request('GET', 'http://music.163.com/api/v1/user/info', req.headers)
						.then(response => {
							userId = JSON.parse(response.body).userPoint.userId
							return request('GET', `http://music.163.com/api/user/playlist?uid=${userId}&limit=1`, req.headers)
						})
						.then(response => {
							pid = JSON.parse(response.body).playlist[0].id
							return request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers,
								`trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`
							)
						})
						.then(response => {
							let body = JSON.parse(response.body)
							if(body.code == 200 || body.code == 502){
								jsonBody = {code: 200, playlistId: pid}
							}
							done()
						})
						.catch(() => {
							done()
						})
					}
					else{
						done()
					}
				}
				else if(query.path.includes('url')){
					let tasks, target = 0

					const modify = item => {
						if(item.code != 200 && (target == 0 || item.id == target)){
							return search(item.id)
							.then(song => {
								item.url = `http://music.163.com/package/${crypto.base64.encode(song.url)}/${item.id}.mp3`
								item.md5 = song.md5
								item.size = song.size
								item.code = 200
								item.br = 320000
								item.type = 'mp3'
							})
							.catch(() => {
								return
							})
						}
					}

					if(!jsonBody['data'] instanceof Array){
						tasks = [modify(jsonBody['data'])]
					}
					else if(query.path.includes('download')){
						jsonBody['data'] = jsonBody['data'][0]
						tasks = [modify(jsonBody['data'])]
					}
					else{
						target = parseInt(JSON.parse(query.param.ids)[0].replace('_0', '')) //reduce time cost
						tasks = jsonBody['data'].map(item => modify(item))
					}
					
					Promise.all(tasks).then(done).catch(done)
				}
				else{
					done()
				}
			})
			.catch(error => {
				ctx.error = error
				reject()
			})
		}
		else{
			resolve()
		}
	})
}

module.exports = {host, path, before, after}