const cache = require('./cache')()
const crypto = require('../crypto')
const request = require('../request')

const search = info => {
	let url =
		'http://songsearch.kugou.com/song_search_v2?' +
		'keyword=' + encodeURIComponent(info.keyword) + '&page=1'

	return request('GET', url)
	.then(response => {
		let jsonBody = JSON.parse(response.body)
		let chief = jsonBody['data']['lists'][0]
		if(chief)
			return chief.FileHash
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + crypto.md5(id + 'kgcloudv2')

	return request('GET', url)
	.then(response => {
		let jsonBody = JSON.parse(response.body)
		if(jsonBody.status == '1')
			return jsonBody.url
		else
			return Promise.reject()
	})
}

const check = info => cache(search, info).then(track).catch(() => {})

module.exports = {check}