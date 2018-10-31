const zlib = require('zlib')
const http = require('http')
const https = require('https')
const parse = require('url').parse

const init = (method, url, headers, headersProtect) => {
	headers = (typeof(headers) == 'undefined') ? {} : headers
	let defaultHeaders = {
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate',
		'accept-language': 'zh-CN,zh;q=0.9',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}
	if(!headersProtect){
		for(let key in defaultHeaders){
			if(!(key in headers))
				headers[key] = defaultHeaders[key]
		}
		headers.host = url.host
	}
	if('content-length' in headers) delete headers['content-length']
	let options = {
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

const make = url => {
	if(proxy)
		return (proxy.protocol == 'https:' ? https.request : http.request)
	else
		return (url.protocol == 'https:' ? https.request : http.request)
}

const request = (method, url, extraHeaders, body, raw) => {
	url = parse(url)
	let options = init(method, url, extraHeaders)

	return new Promise((resolve, reject) => {
		make(url)(options)
		.on('response', res => {
			read(res, raw)
			.then(body => {
				resolve({status: res.statusCode, headers: res.headers, body: body})
			})
			.catch(e => {
				reject(e)
			})
		})
		.on('connect', (res, socket) => {
			https.request({
				method: method,
				host: switchHost(url.hostname),
				path: url.path,
				headers: options.headers,
				socket: socket,
				agent: false
			})
			.on('response', res => {
				read(res, raw)
				.then(body => {
					resolve({status: res.statusCode, headers: res.headers, body: body})
				})
				.catch(e => {
					reject(e)
				})
			})
			.on('error', e => {
				reject(e)
			})
			.end(body)
		})
		.on('error', e => {
			reject(e)
		})
		.end(body)
	})
}

const read = (connect, raw) => {
	return new Promise((resolve, reject) => {
		let chunks = []
		connect
		.on('data', chunk => {
			chunks.push(chunk)
		})
		.on('end', () => {
			end()
		})
		.on('error', e => {
			reject(e)
		})
		const end = () => {
			let buffer = Buffer.concat(chunks)
			if(buffer.length && connect.headers['content-encoding'] == 'gzip')
				buffer = zlib.gunzipSync(buffer)
			if(buffer.length && connect.headers['content-encoding'] == 'deflate')
				buffer = zlib.deflateRaw(buffer)
			resolve(raw == true ? buffer : buffer.toString())
		}
	})
}
request.init = init
request.make = make
request.read = read

module.exports = request