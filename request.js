const zlib = require('zlib')
const http = require('http')
const https = require('https')
const parse = require('url').parse

function init(method, url, headers, headersProtect){
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
		headers.host = url.host
	}
	if('content-length' in headers) delete headers['content-length']
	var options = {
		method: (proxy && url.protocol == 'https:') ? 'CONNECT' : method,
		headers: headers
	}
	if(proxy){
		options.hostname = switchHost(proxy.hostname)
		options.port = proxy.port || ((proxy.protocol == 'https:') ? 443 : 80)
		options.path = (url.protocol != 'https:') ?
			('http://' + switchHost(url.hostname) + url.path) :
			(switchHost(url.hostname) + ':' + (url.port ? url.port : 443))
	}
	else{
		options.hostname = switchHost(url.hostname)
		options.port = url.port || ((url.protocol == 'https:') ? 443 : 80)
		options.path = url.path
	}
	return options
}

function make(url){
	if(proxy)
		return (proxy.protocol == 'https:' ? https.request : http.request)
	else
		return (url.protocol == 'https:' ? https.request : http.request)
}

function request(method, url, extraHeaders, body, raw){
	url = parse(url)
	var options = init(method, url, extraHeaders)

	return new Promise(function(resolve, reject){
		make(url)(options)
		.on('response', function(res){
			read(res, raw)
			.then(function(body){
				resolve({status: res.statusCode, headers: res.headers, body: body})
			})
			.catch(function(e){
				reject(e)
			})
		})
		.on('connect', function(res, socket){
			https.request({
				method: method,
				host: switchHost(url.hostname),
				path: url.path,
				headers: options.headers,
				socket: socket,
				agent: false
			})
			.on('response', function(res){
				read(res, raw)
				.then(function(body){
					resolve({status: res.statusCode, headers: res.headers, body: body})
				})
				.catch(function(e){
					reject(e)
				})
			})
			.on('error', function(e){
				reject(e)
			})
			.end(body)
		})
		.on('error', function(e){
			reject(e)
		})
		.end(body)
	})
}

function read(connect, raw){
	return new Promise(function(resolve, reject){
		var chunks = []
		if(connect.headers['content-encoding'] == 'gzip'){
			var gunzip = zlib.createGunzip()
			.on('data', function(chunk){
				chunks.push(chunk)
			})
			.on('end', function(){
				end()
			})
			.on('error', function(e){
				reject(e)
			})
			connect.pipe(gunzip)
		}
		else{
			connect
			.on('data', function(chunk){
				chunks.push(chunk)
			})
			.on('end', function(){
				end()
			})
			.on('error', function(e){
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