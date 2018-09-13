const zlib = require('zlib')
const url = require('url')
const http = require('http')
const https = require('https')

function init(method, urlObj, headers, headersProtect){
	headers = (typeof(headers) == 'undefined') ? {} : headers
	var defaultHeaders = {
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate',
		'accept-language': 'zh-CN,zh;q=0.9',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}
	if(!headersProtect){
		for(var key in defaultHeaders){
			if(!(key in headers))
				headers[key] = defaultHeaders[key]
		}
		headers.host = urlObj.host
	}
	if('content-length' in headers){
		delete headers['content-length']
	}
	var options = {
		method: (proxy && urlObj.protocol == 'https:') ? 'CONNECT' : method,
		headers: headers
	}
	if(proxy){
		options.hostname = switchHost(proxy.hostname)
		options.port = proxy.port || ((proxy.protocol == 'https:') ? 443 : 80)
		options.path = (urlObj.protocol != 'https:') ?
			('http://' + switchHost(urlObj.hostname) + urlObj.path) :
			(switchHost(urlObj.hostname) + ':' + (urlObj.port ? urlObj.port : 443))
	}
	else{
		options.hostname = switchHost(urlObj.hostname)
		options.port = urlObj.port || ((urlObj.protocol == 'https:') ? 443 : 80)
		options.path = urlObj.path
	}
	return options
}

function make(urlObj){
	if(proxy)
		return (proxy.protocol == 'https:' ? https.request : http.request)
	else
		return (urlObj.protocol == 'https:' ? https.request : http.request)
}

function request(method, uri, extraHeaders, body, raw){
	var urlObj = url.parse(uri)
	var options = init(method, urlObj, extraHeaders)
	var makeRequest = make(urlObj)

	return new Promise(function(resolve, reject){
		var req = makeRequest(options, function(res){
			if(method == 'HEAD')
				resolve(res)
			else if(options.method != 'CONNECT')
				read(res, raw).then(function(body){resolve(body)}).catch(function(e){reject(e)})
		}).on('connect', function(res, socket){
			var proxyReq = https.request({
				method: method,
				host: switchHost(urlObj.hostname),
				path: urlObj.path,
				headers: options.headers,
				socket: socket,
				agent: false
			}, function(res){
				read(res, raw).then(function(body){resolve(body)}).catch(function(e){reject(e)})
			})

			if(typeof(body) != 'undefined'){
				proxyReq.write(body)
			}
			proxyReq.end()
		}).on('error', function(e){
			reject(e)
		})

		if(typeof(body) != 'undefined'){
			req.write(body)
		}
		req.end()
	})
}

function read(connect, raw){
	return new Promise(function(resolve, reject){
		var chunks = []
		if(connect.headers['content-encoding'] == 'gzip'){
			var gunzip = zlib.createGunzip()
			connect.pipe(gunzip)
			gunzip.on('data', function(chunk){
				chunks.push(chunk)
			})
			gunzip.on('end', function(){
				end()
			})
			gunzip.on('error', function(e){
				reject(e)
			})
		}
		else{
			connect.on('data', function(chunk){
				chunks.push(chunk)
			})
			connect.on('end', function(){
				end()
			})
			connect.on('error', function(e){
				reject(e)
			})
		}
		function end(){
			var buffer = Buffer.concat(chunks)
			if(raw == true)
				resolve(buffer)
			else
				resolve(buffer.toString())
		}
	})
}
request.init = init
request.make = make
request.read = read

module.exports = request