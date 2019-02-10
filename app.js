#!/usr/bin/env node

const package = require('./package.json')
const config = require('./cli.js')
.program({name: package.name, version: package.version})
.argument(['-v', '--version'], {action: 'version'})
.argument(['-p', '--port'], {metavar: 'port', help: 'specify server port'})
.argument(['-u', '--proxy-url'], {metavar: 'url', help: 'request through upstream proxy'})
.argument(['-f', '--force-host'], {metavar: 'host', help: 'force the netease server ip'})
.argument(['-o', '--match-order'], {metavar: 'source', nargs: '+', help: 'set priority of sources'})
.argument(['-t', '--token'], {metavar: 'token', help: 'set up http basic authentication'})
.argument(['-s', '--strict'], {action: 'store_true', help: 'enable proxy limitation'})
.argument(['-h', '--help'], {action: 'help'})
.parse(process.argv)

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
	const candidate = config.matchOrder
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
if(config.token && !/\S+:\S+/.test(config.token)){
	console.log('Please check the authentication token.')
	process.exit(1)
}

const parse = require('url').parse
const hook = require('./hook')
const server = require('./server')
const port = config.port || 8080

global.proxy = config.proxyUrl ? parse(config.proxyUrl) : null
global.hosts = {}, hook.target.host.forEach(host => global.hosts[host] = config.forceHost)
config.strict ? server.whitelist = ['music.163.com', 'music.126.net'] : server.blanklist = []
server.authentication = config.token || null

const dns = host => new Promise((resolve, reject) => require('dns').lookup(host, {all: true}, (error, records) => error? reject(error) : resolve(records.map(record => record.address))))
const httpdns = host => require('./request')('POST', 'https://music.httpdns.c.163.com/d', {}, host).then(response => response.json()).then(jsonBody => jsonBody.dns[0].ips)

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