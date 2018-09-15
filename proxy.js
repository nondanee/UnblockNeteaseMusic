const http = require('http')
const url = require('url')
const net = require('net')
const fs = require('fs')
const crypto = require('crypto')

const download = require('./download.js')
const request = require('./request.js')
const search = require('./provider/search.js')
const cryptoNCM = require('./crypto.js')

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

var server = http.createServer(function(req, res){

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
	else if(req.url.indexOf('pre-download') != -1){//host mp3 file

		var fileName = req.url.split('pre-download/').pop()
		var filePath = `cache/${fileName}`
		var start, end

		if(req.headers.range){
			var range = req.headers.range.replace(/bytes=/, '').split('-')
			start = range[0]
			end = range[1]
		}

		fs.stat(filePath, function(error, stat){
			if(error){
				res.writeHead(404)
				res.end()
			}
			else{
				start = start ? parseInt(start, 10) : 0
				end = end ? parseInt(end, 10) : stat.size - 1

				var readStream = fs.createReadStream(filePath, {start: start, end: end})
				res.writeHead(206, {'Content-Type': 'audio/mpeg',
									'Content-Disposition': `inline; filename="${fileName}"`,
									'Accept-Ranges': 'bytes',
									'Content-Range': `bytes ${start}-${end}/${stat.size}`,
									'Content-Length': end - start + 1})
				readStream.pipe(res)
			}
		})

	}
	else{//proxy 

		var urlObj = {}
		if(req.url.indexOf('http://') == 0)
			urlObj = url.parse(req.url)
		else
			urlObj = url.parse('http://music.163.com' + req.url)
		console.log('HTTP >', urlObj.protocol + '//' + urlObj.host)

		var options = request.init(req.method, urlObj, req.headers, true)
		var makeRequest = request.make(urlObj)
		
		if ((urlObj.hostname in cloudMusicApiHost) && req.method == 'POST' &&
			(urlObj.path == '/api/linux/forward' ||urlObj.path.indexOf('/eapi/') == 0)){
			options.headers['X-Real-IP'] = '118.88.88.88'
			request.read(req)
			.then(function(reqBody){
				if(reqBody){
					var reqParam, apiPath
					if (urlObj.path == '/api/linux/forward'){
						reqParam = JSON.parse(cryptoNCM.linuxapi.decrypt(reqBody.replace(/%0+$/, '').slice(8)))
						apiPath = reqParam.url.replace('http://music.163.com', '')
						reqParam = reqParam.params
					}
					else{
						reqParam = cryptoNCM.eapi.decrypt(reqBody.replace(/%0+$/, '').slice(7)).split('-36cd479b6b5-')
						apiPath = reqParam[0]
						reqParam = JSON.parse(reqParam[1])
					}
					apiPath = apiPath.replace(/\/\d*$/, '')
					// console.log(urlObj.path,apiPath)
					var proxyReq = makeRequest(options, function(proxyRes){
						if(detailApiPath.indexOf(apiPath) != -1){
							request.read(proxyRes, true)
							.then(function(buffer){
								bodyHook({path: apiPath, param: reqParam, headers: req.headers}, buffer)
								.then(function(body){
									res.writeHead(proxyRes.statusCode, purifyHeaders(proxyRes.headers))
									res.write(body)
									res.end()
								})
							})
						}
						else{
							res.writeHead(proxyRes.statusCode, proxyRes.headers)
							proxyRes.pipe(res)
						}
					}).on('error', function(e){
						res.end()
					})
					proxyReq.write(reqBody)
					proxyReq.end()
				}
			})
		}
		else{// direct
			var proxyReq = makeRequest(options, function(proxyRes){
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res)
			}).on('error', function(e){
				res.end()
			})
			req.pipe(proxyReq)
		}

	}
}).listen(port)


function purifyHeaders(headers){
	if ('transfer-encoding' in headers)
		delete headers['transfer-encoding']
	if ('content-encoding' in headers)
		delete headers['content-encoding']
	if ('content-length' in headers)
		delete headers['content-length']
	return headers
}


server.on('connect', function(req, socket, head){

	var urlObj = url.parse('https://' + req.url)
	var linkMessage = `HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`
	console.log('HTTPS >', urlObj.href.slice(0, -1))

	if(urlObj.hostname in cloudMusicApiHost){
		socket.write(linkMessage)
		socket.end()
	}
	else if(proxy){
		var options = {
			port: proxy.port,
			hostname: proxy.hostname,
			method: 'CONNECT',
			path: req.url
		}
		var makeRequest = request.make(proxy)
		var proxyReq = makeRequest(options)
		proxyReq.end()

		proxyReq.on('connect', function(res, proxySocket, proxyHead){		
			socket.write(linkMessage)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxyReq.on('error', function(){
			socket.end()
		})
	}
	else{
		var proxySocket = net.connect(urlObj.port, switchHost(urlObj.hostname), function(){
			socket.write(linkMessage)
			proxySocket.write(head)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxySocket.on('error', function(){
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
			jsonBody = JSON.parse(cryptoNCM.eapi.decrypt(buffer.toString('hex')))
		}

		function done(){
			var body = JSON.stringify(jsonBody)
			body = body.replace(/"pic_str":"(\w+)","pic":\d+/g,'"pic_str":"$1","pic":$1') //for js precision
			if(encrypted)
				resolve(Buffer.from(cryptoNCM.eapi.encrypt(body),'hex'))
			else
				resolve(body)
		}

		function inject(item){
			item['st'] = 0
			item['pl'] = 320000
			item['dl'] = 320000
			item['subp'] = 1
		}

		if(req.path.indexOf('detail') != -1){
			if(jsonBody['privileges']){
				jsonBody['privileges'].forEach(function(item){
					inject(item)
				})
			}
			done()
		}
		else if(req.path.indexOf('privilege') != -1){
			jsonBody['data'].forEach(function(item){
				inject(item)
			})
			done()
		}
		else if(req.path == '/api/v1/artist'){
			jsonBody['hotSongs'].forEach(function(item){
				inject(item['privilege'])
			})
			done()
		}
		else if(req.path == '/api/v1/album'){
			jsonBody['songs'].forEach(function(item){
				inject(item['privilege'])
			})
			done()
		}
		else if(req.path == '/batch'){
			if('/api/cloudsearch/pc' in jsonBody){
				if('result' in jsonBody['/api/cloudsearch/pc']){
					jsonBody['/api/cloudsearch/pc']['result']['songs'].forEach(function(item){
						inject(item['privilege'])
					})
				}
			}
			done()
		}
		else if(req.path == '/api/batch'){
			if('/api/artist/top/song' in jsonBody){
				if('songs' in jsonBody['/api/artist/top/song']){
					jsonBody['/api/artist/top/song']['songs'].forEach(function(item){
						inject(item['privilege'])
					})
				}
			}
			done()
		}
		else if(req.path.indexOf('search') != -1){
			if('result' in jsonBody){
				if(jsonBody['result']['songs']){
					jsonBody['result']['songs'].forEach(function(item){
						inject(item['privilege'])
					})
				}
			}
			done()
		}
		else if(req.path.indexOf('manipulate') != -1){
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
			var save = (req.path.indexOf('download') == -1) ? false : true
			var tasks = []
			var target = 0
			// console.log(req.path, save)

			function modify(item){
				if(item.code != 200){
					// console.log(item.id)
					if(target == 0 || item.id == target){ // reduce time cost
						return query(item.id, save)
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
			}

			if(jsonBody['data'] instanceof Array){
				target = parseInt(JSON.parse(req.param.ids)[0].replace('_0', ''))
				tasks = jsonBody['data'].map(function(item){return modify(item)})
			}
			else
				tasks = [modify(jsonBody['data'])]

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

function query(songId, save){
	return new Promise(function(resolve, reject){
		var song = {
			id: songId,
			url: null,
			md5: null,
			size: 0
		}
		fs.stat(`cache/${song.id}.mp3`, function(error, stat){
			if(!error){
				song.size = stat.size
				fileHash(`cache/${song.id}.mp3`)
				.then(function(md5){
					song.url = `http://music.163.com/pre-download/${song.id}.mp3`
					song.md5 = md5
					resolve(song)
				})
				.catch(function(){
					resolve(song)
				})
			}
			else{
				search(song.id)
				.then(function(songUrl){
					song.url = songUrl
					return mediaSize(song.url)
				})
				.then(function(size){
					song.size = size
					if (!save)
						return Promise.reject('return')
					else
						return download(song.id, song.url)
				})
				.then(function(){
					song.url = `http://music.163.com/pre-download/${song.id}.mp3`
					return fileHash(`cache/${song.id}.mp3`)
				})
				.then(function(md5){
					song.md5 = md5
					resolve(song)
				})
				.catch(function(e){
					resolve(song)
				})
			}
		})
	})
}


function mediaSize(songUrl){
	return new Promise(function(resolve, reject){
		request('HEAD', songUrl)
		.then(function(res){
			resolve(parseInt(res.headers['content-length']) || 0)
		})
		.catch(function(e){
			reject(e)
		})
	})
}

function fileHash(filePath){
	return new Promise(function(resolve, reject){
		var readStream = fs.createReadStream(filePath)
		var hash = crypto.createHash('md5')
		readStream.on('data', function(data){
			hash.update.bind(data)
		})
		readStream.on('end', function(){
			resolve(hash.digest('hex'))
		})
		readStream.on('error', function(e){
			reject(e)
		})
	})
}