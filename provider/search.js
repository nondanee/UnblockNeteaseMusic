const crypto = require('crypto')
const request = require('../request.js')
const find = require('./find.js')

const qq = require('./qq.js')
const xiami = require('./xiami.js')
const baidu = require('./baidu.js')
const kugou = require('./kugou.js')
const kuwo = require('./kuwo.js')
const migu = require('./migu.js')
const joox = require('./joox.js')
const provider = [qq, xiami, baidu]

function search(id){
	var meta
	return find(id)
	.then(function(songInfo){
		meta = songInfo
		return Promise.all(provider.map(function(source){
			return source.check(songInfo)
		}))
	})
	.then(function(urls){
		urls = urls.filter(function(url){return url})
		return Promise.all(urls.map(function(url){
			return check(url)
		}))
	})
	.then(function(songs){
		songs = songs.filter(function(song){if(song.url) return song})
		if(songs.length > 0){
			console.log(`[${meta.id}] ${meta.name}\n${songs[0].url}`)
			return songs[0]
		}
		else{
			return Promise.reject()
		}
	})
}

function check(url){
	var song = {size: 0, url: null, md5: null}
	return request('HEAD', url)
	.then(function(response){
		if(response.status != 200)
			return song
		if(url.includes('qq.com'))
			song.md5 = response.headers['server-md5']
		else if(url.includes('xiami.net') || url.includes('qianqian.com'))
			song.md5 = response.headers['etag'].replace(/"/g, '').toLowerCase()
		song.md5 = (song.md5) ? song.md5 : crypto.createHash('md5').update(url).digest('hex') //padding
		song.size = parseInt(response.headers['content-length']) || 0
		song.url = url
		return song
	})
	.catch(function(e){
		return song
	})
}

module.exports = search