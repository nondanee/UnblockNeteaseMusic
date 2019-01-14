const zlib = require('zlib')
const http = require('http')
const https = require('https')
const parse = require('url').parse

const translate = host => (global.hosts || {})[host] || host

const create = url => global.proxy ? (proxy.protocol == 'https:' ? https.request : http.request) : (url.protocol == 'https:' ? https.request : http.request)

const configure = (method, url, headers) => {
	headers = headers || {}
	if('content-length' in headers) delete headers['content-length']
	
	let options = {}
	options.headers = headers
	options.method = (global.proxy && url.protocol == 'https:') ? 'CONNECT' : method

	if(global.proxy){
		options.hostname = translate(proxy.hostname)
		options.port = proxy.port || ((proxy.protocol == 'https:') ? 443 : 80)
		options.path = (url.protocol != 'https:') ? ('http://' + translate(url.hostname) + url.path) : (translate(url.hostname) + ':' + (url.port || 443))
	}
	else{
		options.hostname = translate(url.hostname)
		options.port = url.port || ((url.protocol == 'https:') ? 443 : 80)
		options.path = url.path
	}
	return options
}

const request = (method, url, headers, body, raw) => {
	url = parse(url)
	let options = configure(method, url, Object.assign({
		'host': url.host,
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate',
		'accept-language': 'zh-CN,zh;q=0.9',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}, headers))

	return new Promise((resolve, reject) => {
		create(url)(options)
		.on('response', response => resolve(response))
		.on('connect', (_, socket) => {
			https.request({
				method: method,
				host: translate(url.hostname),
				path: url.path,
				headers: options.headers,
				socket: socket,
				agent: false
			})
			.on('response', response => resolve(response))
			.on('error', error => reject(error))
			.end(body)
		})
		.on('error', error => reject(error))
		.end(body)
	})
	.then(response => 
		read(response, raw).then(body => ({status: response.statusCode, headers: response.headers, body: body}))
	)
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

request.read = read
request.create = create
request.translate = translate
request.configure = configure

module.exports = request