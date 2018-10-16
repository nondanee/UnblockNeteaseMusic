const http = require('http')
const net = require('net')
const parse = require('url').parse

const hook = require('./hook.js')
const crypto = require('./crypto.js')
const request = require('./request.js')

module.exports = http.createServer()
.on('request', function(req, res){
	// pac rule
	if(req.url == '/proxy.pac'){
		var url = parse('http://' + req.headers.host)
		res.writeHead(200, {'Content-Type': 'application/x-ns-proxy-autoconfig'})
		res.end(`
			function FindProxyForURL(url, host) {
				if (${hook.host.map(function(host){return `host == '${host}'`}).join(' || ')}) {
					return 'PROXY ${url.hostname}:${url.port || 80}'
				}
				return 'DIRECT'
			}
		`)
	}
	// packaged song url
	else if(req.url.indexOf('package') != -1){
		try{
			var data = req.url.split('package/').pop().split('/')
			var url = parse(crypto.base64.decode(data[0]))
			var id = data[1].replace('.mp3', '')

			var options = request.init(req.method, url, req.headers)
			request.make(url)(options)
			.on('response', function(proxyRes){
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res)
			})
			.on('error', function(e){
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
		var url = parse(req.url.indexOf('http://') == 0 ? req.url : 'http://music.163.com' + req.url)
		console.log('HTTP >', url.protocol + '//' + url.host)
		const context = {url: url, res: res, req: req, query: {}}
		Promise.resolve()
		.then(function(){
			return hook.before(context)
		})
		.then(function(){
			return access(context)
		})
		.then(function(){
			return hook.after(context)
		})
		.then(function(){
			return finish(context)
		})
		.catch(function(){
			return terminate(context)
		})
	}
})
.on('connect', function(req, socket, head){
	var url = parse('https://' + req.url)
	var handshake = `HTTP/${req.httpVersion} 200 Connection established\r\n\r\n`
	console.log('HTTPS >', url.href.slice(0, -1))

	socket.on('error', function(){
		socket.end()
	})
	if(hook.host.includes(url.hostname)){
		socket.write(handshake)
		socket.end()
	}
	else if(proxy){
		var options = {
			port: proxy.port,
			hostname: proxy.hostname,
			method: 'CONNECT',
			path: req.url
		}
		request.make(proxy)(options)
		.on('connect', function(res, proxySocket, proxyHead){
			socket.write(handshake)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', function(){
			socket.end()
		})
		.end()
	}
	else{
		var proxySocket = net.connect(url.port, switchHost(url.hostname))
		.on('connect', function(){
			socket.write(handshake)
			proxySocket.write(head)
			socket.pipe(proxySocket)
			proxySocket.pipe(socket)
		})
		.on('error', function(){
			socket.end()
		})
	}
})

function access(context){
	return new Promise(function(resolve, reject){
		var options = request.init(context.req.method, context.url, context.req.headers, true)
		context.proxyReq = request.make(context.url)(options)
		.on('response', function(proxyRes){
			context.proxyRes = proxyRes, resolve()
		})
		.on('error', function(error){
			context.error = error, reject()
		})
		if(context.req.readable)
			context.req.pipe(context.proxyReq)
		else
			context.proxyReq.end(context.req.body)
	})
}

function finish(context){
	context.res.writeHead(context.proxyRes.statusCode, context.proxyRes.headers)
	if(context.proxyRes.readable)
		context.proxyRes.pipe(context.res)
	else
		context.res.end(context.proxyRes.body)
}

function terminate(context){
	// console.log('ERROR >', context.error)
	context.res.end()
}