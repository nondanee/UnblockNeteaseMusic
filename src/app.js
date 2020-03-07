#!/usr/bin/env node

const package = require('../package.json')
const config = require('./cli.js')
.program({name: package.name.replace(/@.+\//, ''), version: package.version})
.option(['-v', '--version'], {action: 'version'})
.option(['-p', '--port'], {metavar: 'port', help: 'specify server port'})
.option(['-a', '--address'], {metavar: 'address', help: 'specify server host'})
.option(['-u', '--proxy-url'], {metavar: 'url', help: 'request through upstream proxy'})
.option(['-f', '--force-host'], {metavar: 'host', help: 'force the netease server ip'})
.option(['-o', '--match-order'], {metavar: 'source', nargs: '+', help: 'set priority of sources'})
.option(['-t', '--token'], {metavar: 'token', help: 'set up proxy authentication'})
.option(['-e', '--endpoint'], {metavar: 'url', help: 'replace virtual endpoint with public host'})
.option(['-s', '--strict'], {action: 'store_true', help: 'enable proxy limitation'})
.option(['-h', '--help'], {action: 'help'})
.parse(process.argv)

global.address = config.address
config.port = (config.port || '8080').split(':').map(string => parseInt(string))
const invalid = value => (isNaN(value) || value < 1 || value > 65535)
if (config.port.some(invalid)) {
	console.log('Port must be a number higher than 0 and lower than 65535.')
	process.exit(1)
}
if (config.proxyUrl && !/http(s?):\/\/.+:\d+/.test(config.proxyUrl)) {
	console.log('Please check the proxy url.')
	process.exit(1)
}
if (config.endpoint && !/http(s?):\/\/.+/.test(config.endpoint)) {
	console.log('Please check the endpoint host.')
	process.exit(1)
}
if (config.forceHost && require('net').isIP(config.forceHost) === 0) {
	console.log('Please check the server host.')
	process.exit(1)
}
if (config.matchOrder) {
	const provider = new Set(['netease', 'qq', 'xiami', 'baidu', 'kugou', 'kuwo', 'migu', 'joox', 'youtube'])
	const candidate = config.matchOrder
	if (candidate.some((key, index) => index != candidate.indexOf(key))) {
		console.log('Please check the duplication in match order.')
		process.exit(1)
	}
	else if (candidate.some(key => !provider.has(key))) {
		console.log('Please check the availability of match sources.')
		process.exit(1)
	}
	global.source = candidate
}
if (config.token && !/\S+:\S+/.test(config.token)) {
	console.log('Please check the authentication token.')
	process.exit(1)
}

const parse = require('url').parse
const hook = require('./hook')
const server = require('./server')
const random = array => array[Math.floor(Math.random() * array.length)]
const target = Array.from(hook.target.host)

global.port = config.port
global.proxy = config.proxyUrl ? parse(config.proxyUrl) : null
global.hosts = target.reduce((result, host) => Object.assign(result, {[host]: config.forceHost}), {})
server.whitelist = ['://[\\w.]*music\\.126\\.net', '://[\\w.]*vod\\.126\\.net']
if (config.strict) server.blacklist.push('.*')
server.authentication = config.token || null
global.endpoint = config.endpoint
if (config.endpoint) server.whitelist.push(escape(config.endpoint))

hosts['music.httpdns.c.163.com'] = random(['59.111.181.35', '59.111.181.38'])
hosts['httpdns.n.netease.com'] = random(['59.111.179.213', '59.111.179.214'])

const dns = host => new Promise((resolve, reject) => require('dns').lookup(host, {all: true}, (error, records) => error ? reject(error) : resolve(records.map(record => record.address))))
const httpdns = host => require('./request')('POST', 'https://music.httpdns.c.163.com/d', {}, host).then(response => response.json()).then(jsonBody => jsonBody.dns.reduce((result, domain) => result.concat(domain.ips), []))
const httpdns2 = host => require('./request')('GET', 'https://httpdns.n.netease.com/httpdns/v2/d?domain=' + host).then(response => response.json()).then(jsonBody => Object.keys(jsonBody.data).map(key => jsonBody.data[key]).reduce((result, value) => result.concat(value.ip || []), []))

Promise.all([httpdns, httpdns2].map(query => query(target.join(','))).concat(target.map(dns)))
.then(result => {
	const {host} = hook.target
	result.forEach(array => array.forEach(host.add, host))
	server.whitelist = server.whitelist.concat(Array.from(host).map(escape))
	const log = type => console.log(`${['HTTP', 'HTTPS'][type]} Server running @ http://${address || '0.0.0.0'}:${port[type]}`)
	if (port[0]) server.http.listen(port[0], address).once('listening', () => log(0))
	if (port[1]) server.https.listen(port[1], address).once('listening', () => log(1))
})
.catch(error => console.log(error))