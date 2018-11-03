#! /usr/bin/env node

const program = require('commander')
const package = require('./package.json')

program
	.name(package.name)
	.version(package.version)
	.usage('[options] [value ...]')
	.option('-p, --port <port>', 'specify server port')
	.option('-f, --force-host <host>', 'force the netease server ip')
	.option('-u, --proxy-url <url>', 'request through another proxy')
	.option('-s, --strict', 'enable proxy limitation')
	.parse(process.argv)


if(program.port && (program.port < 1 || program.port > 65535)){
	console.log('Port must be higher than 0 and lower than 65535.')
	process.exit(1)
}

if(program.forceHost && !/\d+\.\d+\.\d+\.\d+/.test(program.forceHost)){
	console.log('Please check the server host.')
	process.exit(1)
}

if(program.proxyUrl && !/http(s?):\/\/.+:\d+/.test(program.proxyUrl)){
	console.log('Please check the proxy url.')
	process.exit(1)
}

const parse = require('url').parse
const hook = require('./hook')
const server = require('./server')
const port = program.port || 8080
let allow = (program.strict ? ['music.163.com', 'music.126.net'] : [''])
let deny = ['music.httpdns.c.163.com', '223.252.199.66', '223.252.199.67']

global.proxy = program.proxyUrl ? parse(program.proxyUrl) : null
global.switchHost = host => ((hook.host.includes(host) && program.forceHost) ? program.forceHost : host)
global.proxyPermit = host => (allow.some(domain => host.endsWith(domain)) && !deny.includes(host))

const dns = host =>
	new Promise((resolve, reject) => require('dns').lookup(host, (e, addresses) => e? reject(e) : resolve(addresses)))

const httpdns = host =>
	require('./request')('POST', 'https://music.httpdns.c.163.com/d', {}, host).then(response => JSON.parse(response.body).dns[0].ips)

Promise.all([httpdns(hook.host[0])].concat(hook.host.map(host => dns(host))))
.then(result => {
	result.forEach(set => deny = deny.concat(set))
	deny = Array.from(new Set(deny))
	server.listen(port)
	console.log(`Server running @ http://0.0.0.0:${port}`)
})
.catch(e => console.log(e))