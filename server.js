const http = require('http')
const net = require('net')
const parse = require('url').parse

const hook = require('./hook.js')
const crypto = require('./crypto.js')
const request = require('./request.js')

module.exports = http.createServer()
.on('request', (req, res) => {
	// pac rule
	if(req.url == '/proxy.pac'){
		let url = parse('http://' + req.headers.host)
		res.writeHead(200, {'Content-Type': 'application/x-ns-proxy-autoconfig'})
		res.end(`
			function FindProxyForURL(url, host) {
				if (${hook.host.map(host => (`host == '${host}'`)).join(' || ')}) {
					return 'PROXY ${url.hostname}:${url.port || 80}'
				}
				return 'DIRECT'
			}
		`)
	}
	// packaged song url
	else if(req.url.includes('package')){
		try{
			let data = req.url.split('package/').pop().split('/')
			let url = parse(crypto.base64.decode(data[0]))
			let id = data[1].replace('.mp3', '')

			let options = request.init(req.method, url, req.headers)
			request.make(url)(options)
			.on('response', proxyRes => {
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res)
			})
			.on('error', e => {
				res.end()
			})
			.end()
		}
		catch(e){
			res.writeHead(400)
			res.end()
		}
	}
	// proxy 
	else{
		let url = parse(req.url.startsWith('http://') ? req.url : 'http://music.163.com' + req.url)
		console.log('HTTP >', url.protocol + '//' + url.host)
		const ctx = {res: res, req: req, url: url, query: {}}
		Promise.resolve()
		.then(() => hook.before(ctx))
		.then(() => access(ctx))
		.then(() => hook.after(ctx))
		.then(() => finish(ctx))
		.catch(() => terminate(ctx))
	}
})
.on('connect', (req, socket, head) => {
	let url = parse('https://' + req.url)
	let handshake = `HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`
	console.log('HTTPS >', url.href.slice(0, -1))

	socket.on('error', () => {
		socket.end()
	})
	if(!proxyPermit(url.hostname)){
		socket.end()
	}
	else if(hook.host.includes(url.hostname)){
		socket.write(handshake)
		socket.end()
	}
	else if(proxy){
		let options = {
			port: proxy.port,
			hostname: proxy.hostname,
			method: 'CONNECT',
			path: req.url
		}
		request.make(proxy)(options)
		.on('connect', (res, proxySocket, proxyHead) => {
			socket.write(handshake)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', () => {
			socket.end()
		})
		.end()
	}
	else{
		let proxySocket = net.connect(url.port || 443, switchHost(url.hostname))
		.on('connect', () => {
			socket.write(handshake)
			proxySocket.write(head)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', () => {
			socket.end()
		})
	}
})

const access = ctx => {
	return new Promise((resolve, reject) => {
		if(!proxyPermit(ctx.url.hostname)) return reject()
		let options = request.init(ctx.req.method, ctx.url, ctx.req.headers, true)
		ctx.proxyReq = request.make(ctx.url)(options)
		.on('response', proxyRes => {
			ctx.proxyRes = proxyRes, resolve()
		})
		.on('error', e => {
			ctx.error = e, reject()
		})
		if(ctx.req.readable)
			ctx.req.pipe(ctx.proxyReq)
		else
			ctx.proxyReq.end(ctx.req.body)
	})
}

const finish = ctx => {
	ctx.res.writeHead(ctx.proxyRes.statusCode, ctx.proxyRes.headers)
	if(ctx.proxyRes.readable)
		ctx.proxyRes.pipe(ctx.res)
	else
		ctx.res.end(ctx.proxyRes.body)
}

const terminate = ctx => {
	// console.log('ERROR >', ctx.error)
	ctx.res.socket.end()
}