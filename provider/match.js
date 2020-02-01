const find = require('./find')
const request = require('../request')

const provider = {
	netease: require('./netease'),
	qq: require('./qq'),
	xiami: require('./xiami'),
	baidu: require('./baidu'),
	kugou: require('./kugou'),
	kuwo: require('./kuwo'),
	migu: require('./migu'),
	joox: require('./joox'),
	youtube: require('./youtube')
}

const match = (id, source) => {
	let meta = {}
	const candidate = (source || global.source || ['qq', 'kuwo', 'migu']).filter(name => name in provider)
	return find(id)
	.then(info => {
		meta = info
		return Promise.all(candidate.map(name => provider[name].check(info).catch(() => {})))
	})
	.then(urls => {
		urls = urls.filter(url => url)
		return Promise.all(urls.map(url => check(url)))
	})
	.then(songs => {
		songs = songs.filter(song => song.url)
		if (!songs.length) return Promise.reject()
		console.log(`[${meta.id}] ${meta.name}\n${songs[0].url}`)
		return songs[0]
	})
}

const check = url => {
	const song = {size: 0, br: null, url: null, md5: null}
	return Promise.race([request('GET', url, {'range': 'bytes=0-8191'}), new Promise((_, reject) => setTimeout(() => reject(504), 5 * 1000))])
	.then(response => {
		if (!response.statusCode.toString().startsWith('2')) return Promise.reject()
		if (url.includes('qq.com'))
			song.md5 = response.headers['server-md5']
		else if (url.includes('xiami.net') || url.includes('qianqian.com'))
			song.md5 = response.headers['etag'].replace(/"/g, '').toLowerCase()
		song.size = parseInt((response.headers['content-range'] || '').split('/').pop() || response.headers['content-length']) || 0
		song.url = response.url.href
		return response.headers['content-length'] === '8192' ? response.body(true) : Promise.reject()
	})
	.then(data => {
		const bitrate = decode(data)
		song.br = (bitrate && !isNaN(bitrate)) ? bitrate * 1000 : null
	})
	.catch(() => {})
	.then(() => song)
}

const decode = buffer => {
	const map = {
		3: {
			3: ['free', 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 'bad'],
			2: ['free', 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 'bad'],
			1: ['free', 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 'bad']
		},
		2: {
			3: ['free', 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 'bad'],
			2: ['free', 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 'bad']
		}
	}
	map[2][1] = map[2][2]
	map[0] = map[2]

	let pointer = 0
	if (buffer.slice(0, 4).toString() === 'fLaC') return 999
	if (buffer.slice(0, 3).toString() === 'ID3') {
		pointer = 6
		const size = buffer.slice(pointer, pointer + 4).reduce((summation, value, index) => summation + (value & 0x7f) << (7 * (3 - index)), 0)
		pointer = 10 + size
	}
	const header = buffer.slice(pointer, pointer + 4)

	// https://www.allegro.cc/forums/thread/591512/674023
	if (
		header.length === 4 &&
		header[0] === 0xff &&
		((header[1] >> 5) & 0x7) === 0x7 &&
		((header[1] >> 1) & 0x3) !== 0 &&
		((header[2] >> 4) & 0xf) !== 0xf &&
		((header[2] >> 2) & 0x3) !== 0x3
	) {
		const version = (header[1] >> 3) & 0x3
		const layer = (header[1] >> 1) & 0x3
		const bitrate = header[2] >> 4
		return map[version][layer][bitrate]
	}
}

module.exports = match