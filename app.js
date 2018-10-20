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


if (program.port && (program.port < 1 || program.port > 65535)) {
	console.log('Port must be higher than 0 and lower than 65535.')
	process.exit(1)
}

if (program.forceHost && !/\d+\.\d+\.\d+\.\d+/.test(program.forceHost)) {
	console.log('Please check the server host.')
	process.exit(1)
}

if (program.proxyUrl && !/http(s?):\/\/.+:\d+/.test(program.proxyUrl)) {
	console.log('Please check the proxy url.')
	process.exit(1)
}

const parse = require('url').parse
const hook = require('./hook.js')
const server = require('./server.js')
const port = program.port || 8080
const permission = (program.strict ? ['music.163.com', 'music.126.net'] : [''])

global.proxy = program.proxyUrl ? parse(program.proxyUrl) : null
global.switchHost = function(host){return (hook.host.includes(host) && program.forceHost) ? program.forceHost : host}
global.proxyPermit = function(host){return permission.some(function(domain){return host.endsWith(domain)})}

server.listen(port)
console.log(`Server running @ http://0.0.0.0:${port}`)
