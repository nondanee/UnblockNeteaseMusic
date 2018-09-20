const http = require('http')
const url = require('url')
const net = require('net')
const fs = require('fs')
const hash = require('crypto')
const base64 = {
	encode: function(text){return Buffer.from(text).toString('base64')},
	decode: function(text){return Buffer.from(text, 'base64').toString('ascii')}
}

const request = require('./request.js')
const search = require('./provider/search.js')
const crypto = require('./crypto.js')

global.switchHost = function(host){
	if(cloudMusicApiHost[host] != null)
		return cloudMusicApiHost[host]
	else
		return host
}

cloudMusicApiHost = {
	'interface.music.163.com': forceHost,
	'music.163.com': forceHost
}

detailApiPath = [
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

http.createServer().listen(port)
.on('request', function(req, res){

	if(req.url == '/proxy.pac'){//pac rule
		var hostObj = url.parse('http://' + req.headers.host)
		res.writeHead(200, {'Content-Type': 'application/x-ns-proxy-autoconfig'})
		res.end(`
			function FindProxyForURL(url, host) {
				if (host == 'music.163.com' || host == 'interface.music.163.com') {
					return 'PROXY ${hostObj.hostname}:${hostObj.port || 80}'
				}
				return 'DIRECT'
			}
		`)
	}
	else if(req.url.indexOf('package') != -1){//packaged song url
		try{
			var params = req.url.split('package/').pop().split('/')
			var songUrl = base64.decode(params[0])
			var songId = params[1].replace('.mp3', '')
			var urlObj = url.parse(songUrl)

			var options = request.init(req.method, urlObj, req.headers)
			request.make(urlObj)(options)
			.on('response', function(proxyRes){
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res)
			})
			.on('error', function(){
				res.end()
			})
			.end()
		}
		catch(e){
			res.writeHead(400)
			res.end()
		}
	}
	else{//proxy 
		var urlObj
		if(req.url.indexOf('http://') == 0)
			urlObj = url.parse(req.url)
		else
			urlObj = url.parse('http://music.163.com' + req.url)
		console.log('HTTP >', urlObj.protocol + '//' + urlObj.host)

		var options = request.init(req.method, urlObj, req.headers, true)
		var makeRequest = request.make(urlObj)
		
		if ((urlObj.hostname in cloudMusicApiHost) && req.method == 'POST' &&
			(urlObj.path == '/api/linux/forward' || urlObj.path.indexOf('/eapi/') == 0)){
			options.headers['X-Real-IP'] = '118.88.88.88'
			request.read(req)
			.then(function(reqBody){
				var reqParam, apiPath
				if(reqBody){
					if(urlObj.path == '/api/linux/forward'){
						reqParam = JSON.parse(crypto.linuxapi.decrypt(reqBody.replace(/%0+$/, '').slice(8)))
						apiPath = reqParam.url.replace('http://music.163.com', '')
						reqParam = reqParam.params
					}
					else{
						reqParam = crypto.eapi.decrypt(reqBody.replace(/%0+$/, '').slice(7)).split('-36cd479b6b5-')
						apiPath = reqParam[0]
						reqParam = JSON.parse(reqParam[1])
					}
					apiPath = apiPath.replace(/\/\d*$/, '')
				}
				// console.log(urlObj.path, apiPath)
				makeRequest(options)
				.on('response', function(proxyRes){
					if(detailApiPath.includes(apiPath)){
						request.read(proxyRes, true)
						.then(function(buffer){
							return bodyHook({path: apiPath, param: reqParam, headers: req.headers}, buffer)
						})
						.then(function(buffer){
							res.writeHead(proxyRes.statusCode, purifyHeaders(proxyRes.headers))
							res.end(buffer)
						})
					}
					else{
						res.writeHead(proxyRes.statusCode, proxyRes.headers)
						proxyRes.pipe(res)
					}
				})
				.on('error', function(){
					res.end()
				})
				.end(reqBody)
			})
		}
		else{// direct
			var proxyReq = makeRequest(options)
			.on('response', function(proxyRes){
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res)
			})
			.on('error', function(e){
				res.end()
			})
			req.pipe(proxyReq)
		}
	}
})
.on('connect', function(req, socket, head){

	var urlObj = url.parse('https://' + req.url)
	var handshake = `HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`
	console.log('HTTPS >', urlObj.href.slice(0, -1))

	if(urlObj.hostname in cloudMusicApiHost){
		socket.write(handshake)
		socket.end()
	}
	else if(proxy){
		var options = {
			port: proxy.port,
			hostname: proxy.hostname,
			method: 'CONNECT',
			path: req.url
		}
		request.make(proxy)(options)
		.on('connect', function(res, proxySocket, proxyHead){
			socket.write(handshake)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', function(){
			socket.end()
		})
		.end()
	}
	else{
		var proxySocket = net.connect(urlObj.port, switchHost(urlObj.hostname))
		.on('connect', function(){
			socket.write(handshake)
			proxySocket.write(head)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', function(){
			socket.end()
		})
	}
})


function bodyHook(req, buffer){

	// console.log(req.path)
	return new Promise(function(resolve, reject){

		var encrypted, jsonBody
		try{
			encrypted = false
			jsonBody = JSON.parse(buffer.toString())
		}
		catch(e){
			encrypted = true
			jsonBody = JSON.parse(crypto.eapi.decrypt(buffer.toString('hex')))
		}

		function done(){

			function inject(key, value){ 
				if(typeof(value) === 'object' && value != null){
					if('pic_str' in value && 'pic' in value) //for js precision
						value['pic'] = value['pic_str']
					if('coverImgId_str' in value && 'coverImgId' in value) //for js precision
						value['coverImgId'] = value['coverImgId_str']
					if('st' in value && 'pl' in value && 'dl' in value && 'subp' in value){ // global modify
						value['st'] = 0
						value['subp'] = 1
						value['pl'] = (value['pl'] == 0) ? 320000 : value['pl']
						value['dl'] = (value['dl'] == 0) ? 320000 : value['dl']
					}
				}
				return value
			}

			var body = JSON.stringify(jsonBody, inject)
			body = body.replace(/"pic":"(\d+)"/g, '"pic":$1')
			body = body.replace(/"coverImgId":"(\d+)"/g, '"coverImgId":$1')
			if(encrypted)
				resolve(Buffer.from(crypto.eapi.encrypt(body), 'hex'))
			else
				resolve(body)
		}

		if(req.path.indexOf('manipulate') != -1){
			if(jsonBody.code == 401){
				var trackId = JSON.parse(req.param.trackIds)[0]
				request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers,
					`trackIds=[${trackId},${trackId}]&pid=${req.param.pid}&op=${req.param.op}`
				)
				.then(function(body){
					jsonBody = JSON.parse(body)
					done()
				})
				.catch(function(e){
					done()
				})
			}
			else{
				done()
			}
		}
		else if(req.path == '/api/song/like'){
			if(jsonBody.code == 401){
				var pid, userId, trackId = req.param.trackId
				request('GET', 'http://music.163.com/api/v1/user/info', req.headers)
				.then(function(body){
					userId = JSON.parse(body).userPoint.userId
				})
				.then(function(){
					return request('GET', `http://music.163.com/api/user/playlist?uid=${userId}&limit=1`, req.headers)
				})
				.then(function(body){
					pid = JSON.parse(body).playlist[0].id
				})
				.then(function(){
					return request('POST', 'http://music.163.com/api/playlist/manipulate/tracks', req.headers,
						`trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`
					)
				})
				.then(function(body){
					body = JSON.parse(body)
					if(body.code == 200 || body.code == 502){
						jsonBody = {code: 200, playlistId: pid}
					}
					done()
				})
				.catch(function(e){
					done()
				})
			}
			else{
				done()
			}
		}
		else if(req.path.indexOf('url') != -1){
			var tasks, target = 0

			function modify(item){
				if(item.code != 200 && (target == 0 || item.id == target)){
					return query(item.id)
					.then(function(song){
						if(song.url){
							item.url = song.url
							item.md5 = song.md5
							item.size = song.size
							item.code = 200
							item.br = 320000
							item.type = 'mp3'
						}
					})
				}
			}

			if(jsonBody['data'] instanceof Array){
				target = parseInt(JSON.parse(req.param.ids)[0].replace('_0', ''))//reduce time cost
				tasks = jsonBody['data'].map(function(item){return modify(item)})
			}
			else{
				tasks = [modify(jsonBody['data'])]
			}

			// console.log(tasks)
			Promise.all(tasks)
			.then(function(){
				done()
			})
			.catch(function(e){
				done()
			})
		}
		else{
			// console.log(req.path)
			done()
		}
	})
}

function query(songId){
	return new Promise(function(resolve, reject){
		var song = {id: songId, url: null, md5: null, size: 0}
		search(song.id)
		.then(function(songUrl){
			song.url = `http://music.163.com/package/${base64.encode(songUrl)}/${song.id}.mp3`
			return mediaMeta(songUrl)
		})
		.then(function(meta){
			song.size = meta.size
			song.md5 = meta.md5
			resolve(song)
		})
		.catch(function(e){
			song.url = null
			resolve(song)
		})
	})
}

function mediaMeta(songUrl){
	return new Promise(function(resolve, reject){
		request('HEAD', songUrl)
		.then(function(res){
			if(res.statusCode != 200)
				return Promise.reject(res.statusCode)
			var meta = {
				size: parseInt(res.headers['content-length']) || 0,
				md5: hash.createHash('md5').update(songUrl).digest('hex') //padding use
			}
			if(songUrl.indexOf('qq.com') != -1)
				meta.md5 = res.headers['server-md5']
			else if(songUrl.indexOf('xiami.net') != -1)
				meta.md5 = res.headers['etag'].replace(/"/g, '')
			else if(songUrl.indexOf('qianqian.com') != -1)
				meta.md5 = res.headers['etag'].replace(/"/g, '')
			resolve(meta)
		})
		.catch(function(e){
			reject(e)
		})
	})
}

function purifyHeaders(headers){
	if('transfer-encoding' in headers)
		delete headers['transfer-encoding']
	if('content-encoding' in headers)
		delete headers['content-encoding']
	if('content-length' in headers)
		delete headers['content-length']
	return headers
}