const crypto = require('crypto')
const request = require('../request.js')

function search(songInfo) {
	var uri = 
		'http://songsearch.kugou.com/song_search_v2?' +
		'keyword=' + encodeURIComponent(songInfo.keyword) + '&page=1'

	return new Promise(function (resolve, reject){
		request('GET', uri)
		.then(function (body) {
			var jsonBody = JSON.parse(body)
			var chief = jsonBody['data']['lists'][0]
			if(chief)
				resolve(chief.FileHash)
			else
				reject()
		})
		.catch(function (e) {
			reject(e)
		})
	})
}

function track(id) {
	var md5 = crypto.createHash('md5')
	var uri = 
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + md5.update(id + 'kgcloudv2').digest('hex')

	return new Promise(function (resolve, reject){
		request('GET', uri)
		.then(function (body) {
			var jsonBody = JSON.parse(body)
			if (jsonBody.status == '1') 
				resolve(jsonBody.url)
			else 
				reject()
		})
		.catch(function (e) {
			reject(e)
		})
	})
}

function check(songInfo) {
	return new Promise(function (resolve, reject){
		search(songInfo)
		.then(function(songId){
			return track(songId)
		})
		.then(function(songUrl){
			resolve(songUrl)
		})
		.catch(function(){
			resolve()
		})
	})
}

module.exports = {
	check: check
}