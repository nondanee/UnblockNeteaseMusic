const zlib = require('zlib')
const http = require('http')
const https = require('https')
const parse = require('url').parse

const map = host => (global.hosts || {})[host] || host

const init = (method, url, headers, headersProtect) => {
	headers = (typeof(headers) == 'undefined') ? {} : headers
	let defaultHeaders = {
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate',
		'accept-language': 'zh-CN,zh;q=0.9',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}
	if(!headersProtect){
		Object.keys(defaultHeaders).forEach(key => {
			if(!(key in headers)) headers[key] = defaultHeaders[key]
		})
		headers.host = url.host
	}
	if('content-length' in headers) delete headers['content-length']
	let options = {
		method: (global.proxy && url.protocol == 'https:') ? 'CONNECT' : method,
		headers: headers
	}
	if(global.proxy){
		options.hostname = map(proxy.hostname)
		options.port = proxy.port || ((proxy.protocol == 'https:') ? 443 : 80)
		options.path = (url.protocol != 'https:') ?
			('http://' + map(url.hostname) + url.path) :
			(map(url.hostname) + ':' + (url.port ? url.port : 443))
	}
	else{
		options.hostname = map(url.hostname)
		options.port = url.port || ((url.protocol == 'https:') ? 443 : 80)
		options.path = url.path
	}
	return options
}

const make = url => {
	if(global.proxy)
		return (proxy.protocol == 'https:' ? https.request : http.request)
	else
		return (url.protocol == 'https:' ? https.request : http.request)
}

const request = (method, url, extraHeaders, body, raw) => {
	url = parse(url)
	let options = init(method, url, extraHeaders)

	return new Promise((resolve, reject) => {
		make(url)(options)
		.on('response', response => {
			read(response, raw)
			.then(body => resolve({status: response.statusCode, headers: response.headers, body: body}))
			.catch(error => reject(error))
		})
		.on('connect', (_, socket) => {
			https.request({
				method: method,
				host: map(url.hostname),
				path: url.path,
				headers: options.headers,
				socket: socket,
				agent: false
			})
			.on('response', response => {
				read(response, raw)
				.then(body => resolve({status: response.statusCode, headers: response.headers, body: body}))
				.catch(error => reject(error))
			})
			.on('error', error => reject(error))
			.end(body)
		})
		.on('error', error => reject(error))
		.end(body)
	})
}

const read = (connect, raw) => {
	return new Promise((resolve, reject) => {
		let chunks = []
		connect
		.on('data', chunk => chunks.push(chunk))
		.on('end', () => {
			let buffer = Buffer.concat(chunks)
			buffer = (buffer.length && ['gzip', 'deflate'].includes(connect.headers['content-encoding'])) ? zlib.unzipSync(buffer) : buffer	
			resolve(raw == true ? buffer : buffer.toString())
		})
		.on('error', error => reject(error))
	})
}
request.init = init
request.make = make
request.read = read

module.exports = request