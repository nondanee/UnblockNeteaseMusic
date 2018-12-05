const find = require('./find')
const crypto = require('../crypto')
const request = require('../request')

const qq = require('./qq')
const xiami = require('./xiami')
const baidu = require('./baidu')
const kugou = require('./kugou')
const kuwo = require('./kuwo')
const migu = require('./migu')
const joox = require('./joox')
const provider = [qq, xiami, baidu]

const search = id => {
	let meta
	return find(id)
	.then(info => {
		meta = info
		return Promise.all(provider.map(source => source.check(info)))
	})
	.then(urls => {
		urls = urls.filter(url => url)
		return Promise.all(urls.map(url => check(url)))
	})
	.then(songs => {
		songs = songs.filter(song => song.url)
		if(songs.length > 0){
			console.log(`[${meta.id}] ${meta.name}\n${songs[0].url}`)
			return songs[0]
		}
		else{
			return Promise.reject()
		}
	})
}

const check = url => {
	let song = {size: 0, url: null, md5: null}
	return request('HEAD', url)
	.then(response => {
		if(response.status != 200) return song
		if(url.includes('qq.com'))
			song.md5 = response.headers['server-md5']
		else if(url.includes('xiami.net') || url.includes('qianqian.com'))
			song.md5 = response.headers['etag'].replace(/"/g, '').toLowerCase()
		song.md5 = (song.md5) ? song.md5 : crypto.md5(url) //placeholder
		song.size = parseInt(response.headers['content-length']) || 0
		song.url = url
		return song
	})
	.catch(() => {
		return song
	})
}

module.exports = search