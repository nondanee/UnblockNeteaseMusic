const request = require('../request.js')

function search(songInfo){
	var url =
		'http://sug.music.baidu.com/info/suggestion?' + 
		'word=' + encodeURIComponent(songInfo.keyword) + '&version=2&from=0'

	return request('GET', url)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		if('data' in jsonBody){
			var chief = jsonBody['data']['song'][0]
			return chief.songid
		}
		else{
			return Promise.reject()
		}
	})
}

function track(id){
	var url =
		'http://music.taihe.com/data/music/fmlink?' +
		'songIds=' + id + '&type=mp3'

	return request('GET', url)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		if('songList' in jsonBody.data)
			return jsonBody.data.songList[0].songLink
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