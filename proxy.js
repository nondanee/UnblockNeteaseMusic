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
	// '/api/batch',
	'/api/v1/search/get',
	'/api/cloudsearch/pc'
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

		var start
		var end

		if(req.headers.range){
			var range = req.headers.range.replace(/bytes=/, "").split("-")
			start = range[0]
			end = range[1]
		}

		fs.stat(filePath,function(error,stat){
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
		console.log("Proxy HTTP request for:", urlObj.protocol + "//" + urlObj.host)

		var options = request.init(req.method, urlObj, req.headers)
		var makeRequest = request.make(urlObj)
		
		if ((urlObj.hostname in cloudMusicApiHost) && req.method == 'POST' &&
			(urlObj.path == '/api/linux/forward' ||urlObj.path.indexOf('/eapi/') == 0)){
			options.headers['X-Real-IP'] = '118.88.88.88'
			request.read(req)
			.then(function(reqBody){
				if(reqBody){
					var param = ''
					var apiPath = ''
					if (urlObj.path == '/api/linux/forward'){
						param = cryptoNCM.linuxapi.decrypt(reqBody.replace(/%0+$/,'').slice(8))
						apiPath = param.match(/http:\/\/music.163.com([^"]+)/)[1]
					}
					else{
						param = cryptoNCM.eapi.decrypt(reqBody.replace(/%0+$/,'').slice(7)).split('-36cd479b6b5-')
						apiPath = param[0]
						param = param[1]
					}
					apiPath = apiPath.replace(/\/\d*$/,'')
					// console.log(urlObj.path,apiPath)
					var proxyReq = makeRequest(options, function(proxyRes){
						if(detailApiPath.indexOf(apiPath) != -1){
							request.read(proxyRes, true)
							.then(function(buffer){
								bodyHook(apiPath, param, buffer)
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
	return headers
}


server.on('connect', function(req, socket, head){

	var urlObj = url.parse('https://' + req.url)
	console.log("Proxy HTTPS request for:", urlObj.href.slice(0,-1))

	if(urlObj.hostname in cloudMusicApiHost){
		socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
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
			socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxyReq.on('error', function(){
			socket.end()
		})
	}
	else{
		var proxySocket = net.connect(urlObj.port, switchHost(urlObj.hostname), function(){
			socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
			proxySocket.write(head)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxySocket.on('error', function(){
			socket.end()
		})
	}
})


function bodyHook(apiPath, param, buffer){

	// console.log(apiPath)
	return new Promise(function(resolve, reject){

		var encrypted
		var jsonBody
		
		try{
			encrypted = false
			jsonBody = JSON.parse(buffer.toString())
		}
		catch(e){
			encrypted = true
			jsonBody = JSON.parse(cryptoNCM.eapi.decrypt(buffer.toString('hex')))
		}

		function finish(){
			var body = JSON.stringify(jsonBody)
			if(encrypted)
				resolve(Buffer.from(cryptoNCM.eapi.encrypt(body),'hex'))
			else
				resolve(body)
		}

		if(apiPath.indexOf('detail') != -1){
			if(jsonBody['privileges']){
				jsonBody['privileges'].forEach(function(item){
					item['st'] = 0
					item['pl'] = 320000
					item['dl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath.indexOf('privilege') != -1){
			jsonBody['data'].forEach(function(item){
				item['st'] = 0
				item['pl'] = 320000
				item['dl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/artist'){
			jsonBody['hotSongs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
				item['privilege']['dl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/album'){
			jsonBody['songs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
				item['privilege']['dl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/batch'){
			if('/api/cloudsearch/pc' in jsonBody){
				jsonBody['/api/cloudsearch/pc']['result']['songs'].forEach(function(item){
					item['privilege']['st'] = 0
					item['privilege']['pl'] = 320000
					item['privilege']['dl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath.indexOf('search') != -1){
			if(jsonBody['result']['songs']){
				jsonBody['result']['songs'].forEach(function(item){
					item['privilege']['st'] = 0
					item['privilege']['pl'] = 320000
					item['privilege']['dl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath.indexOf('url') != -1){
			var local = (apiPath.indexOf('download') == -1) ? false : true
			var tasks = []
			var target = 0
			// console.log(apiPath, local)

			function modify(item){
				if(item.code != 200){
					// console.log(item.id)
					item.code = 200
					item.br = 320000
					item.type = 'mp3'
					if(target == 0 || item.id == target){ // reduce time cost
						return query(item.id,local)
						.then(function(song){
							item.size = song.size
							item.md5 = song.md5
							item.url = song.url
							// console.log(item)
						})
					}
				}
			}

			if(jsonBody['data'] instanceof Array){
				target = parseInt(JSON.parse(JSON.parse(param).ids)[0].replace('_0',''))
				tasks = jsonBody['data'].map(function(item){return modify(item)})
			}
			else
				tasks = [modify(jsonBody['data'])]

			// console.log(tasks)

			Promise.all(tasks)
			.then(function(){
				finish()
			})
			.catch(function(e){
				finish()
			})
		}
		else{
			finish()
		}
	})
}

function query(songId, local){
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
					if (!local){
						return Promise.reject('return')
					}
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