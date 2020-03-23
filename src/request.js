const zlib = require('zlib')
const http = require('http')
const https = require('https')
const parse = require('url').parse

const translate = host => (global.hosts || {})[host] || host

const create = (url, proxy) => (((typeof(proxy) === 'undefined' ? global.proxy : proxy) || url).protocol === 'https:' ? https : http).request

const configure = (method, url, headers, proxy) => {
	headers = headers || {}
	proxy = typeof(proxy) === 'undefined' ? global.proxy : proxy
	if ('content-length' in headers) delete headers['content-length']

	const options = {}
	options._headers = headers
	if (proxy && url.protocol === 'https:') {
		options.method = 'CONNECT'
		options.headers = Object.keys(headers).reduce((result, key) => Object.assign(result, ['host', 'user-agent'].includes(key) && {[key]: headers[key]}), {})
	}
	else {
		options.method = method
		options.headers = headers
	}

	if (proxy) {
		options.hostname = translate(proxy.hostname)
		options.port = proxy.port || ((proxy.protocol === 'https:') ? 443 : 80)
		options.path = (url.protocol === 'https:') ? (translate(url.hostname) + ':' + (url.port || 443)) : ('http://' + translate(url.hostname) + url.path) 
	}
	else {
		options.hostname = translate(url.hostname)
		options.port = url.port || ((url.protocol === 'https:') ? 443 : 80)
		options.path = url.path
	}
	return options
}

const request = (method, url, headers, body, proxy) => {
	url = parse(url)
	headers = headers || {}
	const options = configure(method, url, Object.assign({
		'host': url.hostname,
		'accept': 'application/json, text/plain, */*',
		'accept-encoding': 'gzip, deflate',
		'accept-language': 'zh-CN,zh;q=0.9',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
	}, headers), proxy)

	return new Promise((resolve, reject) => {
		create(url, proxy)(options)
		.on('response', response => resolve(response))
		.on('connect', (_, socket) =>
			https.request({
				method: method,
				path: url.path,
				headers: options._headers,
				socket: socket,
				agent: false
			})
			.on('response', response => resolve(response))
			.on('error', error => reject(error))
			.end(body)
		)
		.on('error', error => reject(error))
		.end(options.method.toUpperCase() === 'CONNECT' ? undefined : body)
	})
	.then(response => {
		if (new Set([201, 301, 302, 303, 307, 308]).has(response.statusCode))
			return request(method, url.resolve(response.headers.location || url.href), (delete headers.host, headers), body, proxy)
		else
			return Object.assign(response, {url: url, body: raw => read(response, raw), json: () => json(response), jsonp: () => jsonp(response)})
	})
}

const read = (connect, raw) =>
	new Promise((resolve, reject) => {
		const chunks = []
		connect
		.on('data', chunk => chunks.push(chunk))
		.on('end', () => resolve(Buffer.concat(chunks)))
		.on('error', error => reject(error))
	})
	.then(buffer => {
		buffer = (buffer.length && ['gzip', 'deflate'].includes(connect.headers['content-encoding'])) ? zlib.unzipSync(buffer) : buffer
		return raw ? buffer : buffer.toString()
	})

const json = connect => read(connect, false).then(body => JSON.parse(body))
const jsonp = connect => read(connect, false).then(body => JSON.parse(body.slice(body.indexOf('(') + 1, -')'.length)))

request.read = read
request.create = create
request.translate = translate
request.configure = configure

module.exports = request