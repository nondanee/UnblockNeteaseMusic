const http = require('http')
const zlib = require('zlib')
const url = require('url')
const net = require('net')

const request = require('./request.js')
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
	'/api/v6/playlist/detail',
	// '/api/playlist/detail/dynamic',
	'/api/album/play',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/album',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	// '/api/song/enhance/download/url',
	'/batch',
	// '/api/batch',
	'/api/v1/search/get',
	'/api/cloudsearch/pc'
]

var server = http.createServer(function (req, res) {

	if(req.url == '/proxy.pac'){
	
	res.writeHead(200, {'Content-Type': 'application/x-ns-proxy-autoconfig'})
	res.end(`
		function FindProxyForURL(url, host) {
				if (host == 'music.163.com' || host == 'interface.music.163.com') {
					return 'PROXY ${req.headers.host}'
				}
				return 'DIRECT'
			}
		`) 
	
	}

	else{

	var urlObj = {}
	if(req.url.indexOf('http://') == 0)
		urlObj = url.parse(req.url)
	else
		urlObj = url.parse('http://music.163.com' + req.url)
	console.log("Proxy HTTP request for:", urlObj.protocol + "//" + urlObj.host)

	var options = request.init(req.method, urlObj, req.headers)
	var makeRequest = (proxy) ? ((proxy.protocol == 'https') ? https.request : http.request) : ((urlObj.protocol == 'https') ? https.request : http.request)
	
	if ((urlObj.hostname in cloudMusicApiHost) && req.method == 'POST' &&
		(urlObj.path == '/api/linux/forward' ||urlObj.path.indexOf('/eapi/') == 0)){
		options.headers['X-Real-IP'] = '118.88.88.88'
		var reqBody = ''
		req.on('data', function (data) {
			reqBody += data
		})
		req.on('end', function () {
			if(reqBody){
				var param = ''
				var apiPath = ''
				if (urlObj.path == '/api/linux/forward'){
					param = decryptLinuxapi(reqBody.slice(8))
					apiPath = param.match(/http:\/\/music.163.com([^"]+)/)[1]
				}
				else{
					param = decryptEapi(reqBody.slice(7))
					apiPath = param.split('-36cd479b6b5-')[0]
				}
				apiPath = apiPath.replace(/\/\d*$/,'')
				// console.log(apiPath)
				var proxyReq = makeRequest(options, function(proxyRes) {
					if(detailApiPath.indexOf(apiPath) != -1){
						request.read(proxyRes, true).then(function (buffer){
							bodyHook(apiPath,buffer)
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
		var proxyReq = makeRequest(options, function(proxyRes) {
			res.writeHead(proxyRes.statusCode, proxyRes.headers)
			proxyRes.pipe(res)
		}).on('error', function (e) {
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


server.on('connect', function (req, socket, head) {

	var urlObj = url.parse('https://' + req.url)
	console.log("Proxy HTTPS request for:", urlObj.href.slice(0,-1))

	if(urlObj.hostname in cloudMusicApiHost){
		socket.write(`HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`)
		socket.end()
	}
	else if(proxy){
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
		else if(apiPath == '/api/cloudsearch/pc'){
			jsonBody['result']['songs'].forEach(function(item){
				item['privilege']['st'] = 0
				item['privilege']['pl'] = 320000
				item['privilege']['dl'] = 320000
			})
			finish()
		}
		else if(apiPath == '/api/v1/search/get'){
			if(jsonBody['result']['songs']){
				jsonBody['result']['songs'].forEach(function(item){
					item['privilege']['st'] = 0
					item['privilege']['pl'] = 320000
					item['privilege']['dl'] = 320000
				})
			}
			finish()
		}
		else if(apiPath.indexOf('url')){
			var item = {}
			if(jsonBody['data'] instanceof Array)
				item = jsonBody['data'][0]
			else
				item = jsonBody['data']
			if(item['code'] != 200){
				search(item['id'],proxy)
				.then(function (songUrl) {
					playCheck(songUrl)
					.then(function (size){
						item.url = songUrl
						item.br = 320000
						item.size = size
						item.code = 200
						item.type = 'mp3'
						finish()
					})
					.catch(function () {
						finish()
					})
				})
				.catch(function () {
					finish()
				})
			}
			else{
				finish()
			}
		}
		else{
			finish()
		}
	})
}


function playCheck(songUrl){
	return new Promise(function(resolve, reject){
		request('HEAD', songUrl)
		.then(function (headers){
			resolve(headers['content-length'] || 0)
		})
		.catch(function (e){
			reject()
		})
	})
}