const crypto = require('crypto')
const request = require('../request.js')

function search(songInfo){
	var url =
		'http://songsearch.kugou.com/song_search_v2?' +
		'keyword=' + encodeURIComponent(songInfo.keyword) + '&page=1'

	return request('GET', url)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		var chief = jsonBody['data']['lists'][0]
		if(chief)
			return chief.FileHash
		else
			return Promise.reject()
	})
}

function track(id){
	var md5 = crypto.createHash('md5')
	var url =
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + md5.update(id + 'kgcloudv2').digest('hex')

	return request('GET', url)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		if (jsonBody.status == '1')
			return jsonBody.url
		else
			return Promise.reject()
	})
}

function check(songInfo){
	return search(songInfo)
	.then(function(songId){
		return track(songId)
	})
	.catch(function(e){
		return
	})
}

module.exports = {check}