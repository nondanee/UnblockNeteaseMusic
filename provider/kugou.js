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
	// let url =
	// 	'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=' + id

	// return request('GET', url)
	// .then(response => response.json())
	// .then(jsonBody => jsonBody.url || Promise.reject())

	let url =
		'http://trackercdn.kugou.com/i/v2/?' +
		'key=' + crypto.md5.digest(`${id}kgcloudv2`) + '&hash=' + id + '&' +
		'br=hq&appid=1005&pid=2&cmd=25&behavior=play'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => jsonBody.url[0] || Promise.reject())
}

const check = info => cache(search, info).then(track)

module.exports = {check, search}