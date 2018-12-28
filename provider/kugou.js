const crypto = require('crypto')
const cache = require('./cache')()
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
	let md5 = crypto.createHash('md5')
	let url =
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + md5.update(id + 'kgcloudv2').digest('hex')

	return request('GET', url)
	.then(response => {
		let jsonBody = JSON.parse(response.body)
		if(jsonBody.status == '1')
			return jsonBody.url
		else
			return Promise.reject()
	})
}

const check = info => cache(search, info).then(id => track(id)).catch(() => {})

module.exports = {check}