const request = require('../request.js')

var extraHeaders = {
	'cookie': 'user_from=2;XMPLAYER_addSongsToggler=0;XMPLAYER_isOpen=0;_xiamitoken=cb8bfadfe130abdbf5e2282c30f0b39a;',
	'origin': 'http://www.xiami.com/',
	'referer': 'http://www.xiami.com/'
}

function caesar(location){
	var num = location[0];
	var avg_len = Math.floor(location.slice(1).length / num)
	var remainder = location.slice(1).length % num

	var result = [];
	for(var i=0; i<remainder; i++){
		var line = location.slice(i * (avg_len + 1) + 1, (i + 1) * (avg_len + 1) + 1)
		result.push(line)
	}
	for(var i=0; i<num-remainder; i++){
		var line = location.slice((avg_len + 1) * remainder).slice(i * avg_len + 1, (i + 1) * avg_len + 1)
		result.push(line)
	}

	var s = [];
	for(var i=0; i<avg_len; i++){
		for(var j=0; j<num; j++){
			s.push(result[j][i])
		}
	}
	for(var i=0; i<remainder; i++){
		s.push(result[i].slice(-1))
	}

	return unescape(s.join('')).replace(/\^/g, '0')
}

function search(songInfo){
	var url =
		'http://api.xiami.com/web?v=2.0&app_key=1' + 
		'&key=' + encodeURIComponent(songInfo.keyword) + '&page=1' +
		'&limit=20&callback=jsonp154&r=search/songs'

	return request('GET', url, extraHeaders)
	.then(function(response){
		var jsonBody = JSON.parse(response.body.slice('jsonp154('.length, -')'.length))
		var chief = jsonBody['data']['songs'][0]
		if(chief){
			if(chief.listen_file)
				return chief.listen_file
			else
				return chief.song_id
		}
		else
			return Promise.reject()
	})
}

function track(id) {
	var url =
		'https://www.xiami.com/song/playlist/id/' + id +
		'/object_name/default/object_id/0/cat/json'
	
	return request('GET', url, extraHeaders)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		if(jsonBody.data.trackList == null){
			return Promise.reject()
		}
		else{
			var location = jsonBody.data.trackList[0].location
			var songUrl = 'http:' + caesar(location)
			return songUrl
		}
	})
}

function improve(songUrl){
	var updatedSongUrl = songUrl.replace('m128','m320')
	return request('HEAD', updatedSongUrl)
	.then(function(response){
		if(response.status == 200)
			return updatedSongUrl
		else
			return songUrl
	})
	.catch(function(e){
		return songUrl
	})
}

function check(songInfo){
	return search(songInfo)
	.then(function(songUrl){
		if(typeof(songUrl) === 'number')
			return track(songUrl)
		else
			return songUrl
	})
	.then(function(songUrl){
		return improve(songUrl)
	})
	.catch(function(e){
		return
	})
}

module.exports = {check}