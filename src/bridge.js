#!/usr/bin/env node
const cache = require('./cache')
const parse = require('url').parse
require('./provider/insure').disable = true

const router = {
	qq: require('./provider/qq'),
	xiami: require('./provider/xiami'),
	baidu: require('./provider/baidu'),
	kugou: require('./provider/kugou'),
	kuwo: require('./provider/kuwo'),
	migu: require('./provider/migu'),
	joox: require('./provider/joox'),
	bilibili: require('./provider/bilibili')
}

const distribute = (url, router) =>
	Promise.resolve()
	.then(() => {
		const route = url.pathname.slice(1).split('/').map(path => decodeURIComponent(path))
		let pointer = router, argument = decodeURIComponent(url.query)
		try {argument = JSON.parse(argument)} catch(e) {}
		const miss = route.some(path => {
			if (path in pointer) pointer = pointer[path]
			else return true
		})
		if (miss || typeof pointer != 'function') return Promise.reject()
		// return pointer.call(null, argument)
		return cache(pointer, argument, 15 * 60 * 1000)
	})

require('http').createServer()
.listen(parseInt(process.argv[2]) || 9000)
.on('request', (req, res) =>
	distribute(parse(req.url), router)
	.then(data => res.write(data))
	.catch(() => res.writeHead(404))
	.then(() => res.end())
)