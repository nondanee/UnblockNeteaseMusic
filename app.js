#! /usr/bin/env node
const parse = require('url').parse
const program = require('commander')
const package = require("./package.json")

program
	.name(package.name)
	.version(package.version)
	.usage('[options] [value ...]')
	.option('-p, --port <port>', 'specify server port')
	.option('-f, --force-host <host>', 'force the netease server ip')
	.option('-u, --proxy-url <url>', 'request through another proxy')
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

global.port = program.port || 8080
global.forceHost = program.forceHost || null

if (program.proxyUrl)
	global.proxy = parse(program.proxyUrl)
else
	global.proxy = ''

require('./proxy.js')

console.log('Server running @ http://0.0.0.0:' + port)
