const cache = require('../cache')
const insure = require('./insure')
const crypto = require('../crypto')
const request = require('../request')

const search = info => {
	let url =
		'http://songsearch.kugou.com/song_search_v2?' +
		'keyword=' + encodeURIComponent(info.keyword) + '&page=1'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		let matched = jsonBody.data.lists[0]
		if(matched)
			return matched.FileHash
		else
			return Promise.reject()
	})
	.catch(() => insure().kugou.search(info))
}

const track = id => {
	let url =
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + crypto.md5(id + 'kgcloudv2')

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		if(jsonBody.status == '1')
			return jsonBody.url
		else
			return Promise.reject()
	})
}

const check = info => cache(search, info).then(track).catch(() => {})

module.exports = {check, search}