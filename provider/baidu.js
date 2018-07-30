const request = require('../request.js')

function search(songInfo){
	var uri = 
		'http://sug.music.baidu.com/info/suggestion?' + 
		'word=' + encodeURIComponent(songInfo.keyword) + '&version=2&from=0'

	return new Promise(function(resolve, reject){
		request('GET', uri)
		.then(function(body){
			var jsonBody = JSON.parse(body)
			if('data' in jsonBody){
				var chief = jsonBody['data']['song'][0]
				resolve(chief.songid)
			}
			else{
				reject()
			}
		})
		.catch(function(e){
			reject(e)
		})
	})
}

function track(id){
	var uri = 
		'http://music.taihe.com/data/music/fmlink?' +
		'songIds=' + id + '&type=mp3'

	return new Promise(function(resolve, reject){
		request('GET', uri)
		.then(function(body){
			var jsonBody = JSON.parse(body)
			if('songList' in jsonBody.data)
				resolve(jsonBody.data.songList[0].songLink)
			else
				reject()
		})
		.catch(function(e){
			reject(e)
		})
	})
}

function check(songInfo){
	return new Promise(function(resolve, reject){
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