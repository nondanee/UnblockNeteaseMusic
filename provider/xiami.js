const request = require('../request.js')

var extraHeaders = {
	'Origin': 'http://m.xiami.com/',
	'Referer': 'http://m.xiami.com/'
}

function caesar(location) {
	var num = location[0]
	var avg_len = Math.floor(location.slice(1).length / num)
	var remainder = location.slice(1).length % num
	var result = []
	for (var i=0; i<remainder; i++) {
		var line = location.slice(i * (avg_len + 1) + 1, (i + 1) * (avg_len + 1) + 1)
		result.push(line)
	}
	for (var i=0; i<num-remainder; i++) {
		var line = location.slice((avg_len + 1) * remainder).slice(i * avg_len + 1, (i + 1) * avg_len + 1)
		result.push(line)
	}
	var s = [];
	for (var i=0; i< avg_len; i++) {
		for (var j=0; j<num; j++){
			s.push(result[j][i])
		}
	}
	for (var i=0; i<remainder; i++) {
		s.push(result[i].slice(-1))
	}
	return unescape(s.join('')).replace(/\^/g, '0')
}

function search(songInfo) {
	var uri = 
		'http://api.xiami.com/web?v=2.0&app_key=1' + 
		'&key=' + encodeURIComponent(songInfo.keyword) + '&page=1' +
		'&limit=20&callback=jsonp154&r=search/songs'

	return new Promise(function (resolve, reject){
		request(uri, extraHeaders)
		.then(function (body) {
			var jsonBody = JSON.parse(body.slice('jsonp154('.length, -')'.length))
			var chief = jsonBody['data']['songs'][0]
			if(chief){
				resolve(chief.song_id)
			}
			else{
				reject()
			}
		})
		.catch(function (e) {
			reject(e)
		})
	})
}


function track(id) {
	var uri =
		'https://www.xiami.com/song/playlist/id/' + id +
		'/object_name/default/object_id/0/cat/json'

	return new Promise(function (resolve, reject){
		request(uri, extraHeaders)
		.then(function (body) {
			var jsonBody = JSON.parse(body)
			if (jsonBody.data.trackList == null){
				reject()
			}
			else{
				var location = jsonBody.data.trackList[0].location
				var songUrl = 'http:' + caesar(location)
				resolve(songUrl)
			}
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
			track(songId)
			.then(function(songUrl){
				resolve(songUrl)
			})
			.catch(function(){
				resolve()
			})
		})
		.catch(function(){
			resolve()
		})
	})
}

module.exports = {
	check: check
}