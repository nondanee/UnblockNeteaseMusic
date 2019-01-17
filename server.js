const http = require('http')
const net = require('net')
const parse = require('url').parse

const hook = require('./hook')
const request = require('./request')

const server = http.createServer()
.on('request', (req, res) => {
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
	else{
		const ctx = {res, req}
		Promise.resolve()
		.then(() => hook.http.before(ctx))
		.then(() => proxy.filter(ctx))
		.then(() => proxy.log(ctx))
		.then(() => proxy.mitm.send(ctx))
		.then(() => hook.http.after(ctx))
		.then(() => proxy.mitm.receive(ctx))
		.catch(() => proxy.mitm.close(ctx))
	}
})
.on('connect', (req, socket, head) => {
	const ctx = {req, socket, head}
	Promise.resolve()
	.then(() => hook.https.before(ctx))
	.then(() => proxy.filter(ctx))
	.then(() => proxy.log(ctx))
	.then(() => proxy.tunnel.connect(ctx))
	.then(() => proxy.tunnel.handshake(ctx))
	.then(() => proxy.tunnel.pipe(ctx))
	.catch(() => proxy.tunnel.close(ctx))
})

server.whitelist = ['.*']
server.blacklist  = ['.*']

const proxy = {
	log: ctx => {
		const mark = {close: '|', blank: '-', proxy: '>'}[ctx.decision] || '>'
		if(ctx.socket)
			console.log('TUNNEL', mark, ctx.req.url)
		else
			console.log('MITM', mark, parse(ctx.req.url).host)
	},
	filter: ctx => {
		const url = parse(ctx.req.url)
		if(!ctx.decision){
			try{
				let allow = server.whitelist.some(pattern => url.href.search(new RegExp(pattern, 'g')) != -1)
				let deny = server.blacklist.some(pattern => url.href.search(new RegExp(pattern, 'g')) != -1)
				// console.log('allow', allow, 'deny', deny)
				if(!allow && deny){	
					ctx.decision = 'close'
				}
			}
			catch(error){
				ctx.error = error
			}
		}
	},
	mitm: {
		send: ctx => new Promise((resolve, reject) => {
			if(ctx.decision === 'close') return reject(ctx.error = ctx.decision)
			const req = ctx.req
			const url = parse(req.url)
			const options = request.configure(req.method, url, req.headers)
			ctx.proxyReq = request.create(url)(options)
			.on('response', proxyRes => {
				return resolve(ctx.proxyRes = proxyRes)
			})
			.on('error', error => {
				return reject(ctx.error = error)
			})
			req.readable ? req.pipe(ctx.proxyReq) : ctx.proxyReq.end(req.body)
		}),
		receive: ctx => {
			const res = ctx.res
			const proxyRes = ctx.proxyRes
			res.writeHead(proxyRes.statusCode, proxyRes.headers)
			proxyRes.readable ? proxyRes.pipe(res) : res.end(proxyRes.body)
		},
		close: ctx => {
			ctx.res.socket.end()
		}
	},
	tunnel: {
		connect: ctx => new Promise((resolve, reject) => {
			if(ctx.decision === 'close') return reject(ctx.error = ctx.decision)
			const req = ctx.req
			const socket = ctx.socket
			const head = ctx.head
			const url = parse('https://' + req.url)
			socket.on('error', error => {
				return reject(ctx.error = error)
			})
			if(global.proxy){
				const options = request.configure(req.method, url, req.headers)
				request.create(proxy)(options)
				.on('connect', (_, proxySocket) => {
					return resolve(ctx.proxySocket = proxySocket)
				})
				.on('error', error => {
					return reject(ctx.error = error)
				})
				.end()
			}
			else{
				const proxySocket = net.connect(url.port || 443, request.translate(url.hostname))
				.on('connect', () => {
					proxySocket.write(head)
					return resolve(ctx.proxySocket = proxySocket)
				})
				.on('error', error => {
					return reject(ctx.error = error)
				})
			}
		}),
		handshake: ctx => {
			const req = ctx.req
			const socket = ctx.socket
			const message = `HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`
			socket.write(message)
		},
		pipe: ctx => {
			if(ctx.decision === 'blank') return reject(ctx.error = ctx.decision)
			const socket = ctx.socket
			const proxySocket = ctx.proxySocket
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		},
		close: ctx => {
			ctx.socket.end()
		}
	}
}

module.exports = server