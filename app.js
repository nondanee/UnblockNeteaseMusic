#!/usr/bin/env node

const package = require('./package.json')
const config = require('./config.json')

try{
	Object.assign(config, require('commander')
	.name(package.name)
	.version(package.version, '-v, --version')
	.usage('[options] [value ...]')
	.option('-p, --port <port>', 'specify server port')
	.option('-u, --proxy-url <url>', 'request through another proxy')
	.option('-f, --force-host <host>', 'force the netease server ip')
	.option('-o, --match-order <name,...>', 'set priority of sources')
	.option('-s, --strict', 'enable proxy limitation')
	.parse(process.argv))
}catch(error){}

if(config.port && (isNaN(config.port) || config.port < 1 || config.port > 65535)){
	console.log('Port must be a number higher than 0 and lower than 65535.')
	process.exit(1)
}
if(config.proxyUrl && !/http(s?):\/\/.+:\d+/.test(config.proxyUrl)){
	console.log('Please check the proxy url.')
	process.exit(1)
}
if(config.forceHost && !/\d+\.\d+\.\d+\.\d+/.test(config.forceHost)){
	console.log('Please check the server host.')
	process.exit(1)
}
if(config.matchOrder){
	const provider = ['qq', 'xiami', 'baidu', 'kugou', 'kuwo', 'migu', 'joox']
	const candidate = config.matchOrder.split(/\s*\W\s*/)
	if(candidate.some((key, index) => index != candidate.indexOf(key))){
		console.log('Please check the duplication in match order.')
		process.exit(1)
	}
	else if(candidate.some(key => !provider.includes(key))){
		console.log('Please check the validation of match order.')
		process.exit(1)
	}
	global.source = candidate
}

const parse = require('url').parse
const hook = require('./hook')
const server = require('./server')
const port = config.port

global.proxy = config.proxyUrl ? parse(config.proxyUrl) : null
global.hosts = {}, hook.target.host.forEach(host => global.hosts[host] = config.forceHost)
config.strict ? server.whitelist = ['music.163.com', 'music.126.net'] : server.blanklist = []

const dns = host =>
	new Promise((resolve, reject) => require('dns').lookup(host, {all: true}, (error, records) => error? reject(error) : resolve(records.map(record => record.address))))

const httpdns = host =>
	require('./request')('POST', 'https://music.httpdns.c.163.com/d', {}, host).then(response => response.json()).then(jsonBody => jsonBody.dns[0].ips)

Promise.all([httpdns(hook.target.host[0])].concat(hook.target.host.map(host => dns(host))))
.then(result => {
	let extra = []
	result.forEach(set => extra = extra.concat(set))
	extra = Array.from(new Set(extra))
	hook.target.host = hook.target.host.concat(extra)
	server.listen(port)
	console.log(`Server running @ http://0.0.0.0:${port}`)
})
.catch(error => console.log(error))