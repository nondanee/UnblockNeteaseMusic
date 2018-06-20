const http = require('http')
const zlib = require('zlib')
const url = require('url')
const net = require('net')

const {decryptEapi, encryptEapi, decryptLinuxapi, encryptLinuxapi} = require('./crypto.js')

const search = require('./provider/search.js')

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
	// '/api/playlist/detail/dynamic',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/album',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	'/batch',
	'/api/v1/search/get',
	'/api/cloudsearch/pc'
]

var server = http.createServer(function (req, res) {

	var urlObj = {}
	if(req.url.indexOf('http://') == 0)
		urlObj = url.parse(req.url)
	else
		urlObj = url.parse('http://music.163.com' + req.url)

	var target = urlObj.protocol + "//" + urlObj.host
	console.log("Proxy HTTP request for:", target)

	var options = {
		method: req.method,
		headers: req.headers
	}

	if(proxy){
		options.hostname = proxy.hostname
		options.port = proxy.port
		options.path = urlObj.href.replace('music.163.com',switchHost('music.163.com'))
	}
	else{
		options.hostname = switchHost(urlObj.hostname)
		options.port = urlObj.port || 80
		options.path = urlObj.path
	}
	
	if ((urlObj.hostname in cloudMusicApiHost) && (urlObj.path == '/api/linux/forward' ||urlObj.path.indexOf('/eapi/') == 0) && req.method == 'POST'){
		options.headers['X-Real-IP'] = '118.88.88.88'
		var reqBody = ''
		req.on('data', function (chunk) {
			reqBody += chunk
		})
		req.on('end', function () {
			if(reqBody){
				var text = ''
				var apiPath = ''
				if (urlObj.path == '/api/linux/forward'){
					text = decryptLinuxapi(reqBody.slice(8))
					apiPath = text.match(/http:\/\/music.163.com([^"]+)/)[1]
				}
				else{
					text = decryptEapi(reqBody.slice(7))
					apiPath = text.split('-36cd479b6b5-')[0]
				}
				apiPath = apiPath.replace(/\/\d*$/,'')
				var proxyReq = http.request(options, function(proxyRes) {
					if(detailApiPath.indexOf(apiPath) != -1){
						res.writeHead(proxyRes.statusCode, purifyHeaders(proxyRes.headers))
						var chunks = []
						var gunzip = zlib.createGunzip()
						proxyRes.pipe(gunzip)

						gunzip.on('data', function (data) {
							chunks.push(data)
						})
						gunzip.on('end', function() {
							var buffer = Buffer.concat(chunks)
							bodyHook(apiPath,buffer)
							.then(function(body){
								res.write(body)
								res.end()
							})
						})
					}
					else{
						res.writeHead(proxyRes.statusCode, proxyRes.headers)
						proxyRes.pipe(res)
					}
				}).on('error', function (e) {
					res.end()
				})
				proxyReq.write(reqBody)
				proxyReq.end()
			}
		})
	}

	// direct
	else{
		var proxyReq = http.request(options, function(proxyRes) {
			res.writeHead(proxyRes.statusCode, proxyRes.headers)
			proxyRes.pipe(res)
		}).on('error', function (e) {
			res.end()
		})
		req.pipe(proxyReq)
	}

}).listen(port)


function purifyHeaders(headers){
	if ('transfer-encoding' in headers)
		delete headers['transfer-encoding']
	if ('content-encoding' in headers)
		delete headers['content-encoding']
	return headers
}


server.on('connect', function (req, socket, head) {

	var urlObj = url.parse('https://' + req.url)
	console.log("Proxy HTTPS request for:", urlObj.href.slice(0,-1))

	if(proxy){
		const options = {
			port: proxy.port,
			hostname: proxy.hostname,
			method: 'CONNECT',
			path: req.url
		}

		const proxyReq = http.request(options)
		proxyReq.end()

		proxyReq.on('connect', function (res, proxySocket, proxyHead) {		
			socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxyReq.on('error', function () {
			socket.end()
		})
	}
	else{
		var proxySocket = net.connect(urlObj.port, switchHost(urlObj.hostname), function () {
			socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
			proxySocket.write(head)
			proxySocket.pipe(socket)
			socket.pipe(proxySocket)
		})
		proxySocket.on('error', function () {
			socket.end()
		})
	}
})


function bodyHook(apiPath,buffer){

	// console.log(apiPath)
	return new Promise(function (resolve, reject){

		var encrypt = false
		var jsonBody = {}
		try{
			jsonBody = JSON.parse(buffer.toString())
		}
		catch(e){
			encrypt = true
			jsonBody = JSON.parse(decryptEapi(buffer.toString('hex')))
		}

		function finish(){
			var body = JSON.stringify(jsonBody)
			if(encrypt)
				resolve(Buffer.from(encryptEapi(body),'hex'))
			else
				resolve(body)
		}

		if(apiPath.indexOf('detail') != -1){
			// console.log(apiPath)
			if(jsonBody['privileges']){
				jsonBody['privileges'].forEach(function(item){
					item['st'] = 0
					item['pl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath.indexOf('privilege') != -1){
			jsonBody['data'].forEach(function(item){
				item['st'] = 0
				item['pl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/artist'){
			jsonBody['hotSongs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/album'){
			jsonBody['songs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/batch'){
			if('/api/cloudsearch/pc' in jsonBody){
				jsonBody['/api/cloudsearch/pc']['result']['songs'].forEach(function(item){
					item['privilege']['st'] = 0
					item['privilege']['pl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath == '/api/cloudsearch/pc'){
			jsonBody['result']['songs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/search/get'){
			if(jsonBody['result']['songs']){
				jsonBody['result']['songs'].forEach(function(item){
					item['privilege']['st'] = 0
					item['privilege']['pl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath == '/api/song/enhance/player/url'){
			jsonBody['data'].forEach(function(item){
				if(item['code'] != 200){
					search(item['id'],proxy)
					.then(function (songUrl) {
						item.url = songUrl
						item.br = 320000
						item.code = 200
						finish()
					})
					.catch(function () {
						finish()
					})
				}
				else{
					finish()
				}
			})
		}
	})
}
