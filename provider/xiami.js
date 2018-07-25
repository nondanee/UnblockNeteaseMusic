const request = require('../request.js')

var extraHeaders = {
	'Cookie': 'user_from=2;XMPLAYER_addSongsToggler=0;XMPLAYER_isOpen=0;_xiamitoken=cb8bfadfe130abdbf5e2282c30f0b39a;',
	'Origin': 'http://m.xiami.com/',
	'Referer': 'http://m.xiami.com/'
}

function track(songInfo) {
	var uri = 
		'http://api.xiami.com/web?v=2.0&app_key=1' + 
		'&key=' + encodeURIComponent(songInfo.keyword) + '&page=1' +
		'&limit=20&callback=jsonp154&r=search/songs'

	return new Promise(function (resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function (body) {
			var jsonBody = JSON.parse(body.slice('jsonp154('.length, -')'.length))
			var chief = jsonBody['data']['songs'][0]
			if(chief && chief.listen_file)
				resolve(chief.listen_file)
			else
				reject()
		})
		.catch(function (e) {
			reject(e)
		})
	})
}

function improve(songUrl){
	var updatedSongUrl = songUrl.replace('m128','m320')
	return new Promise(function (resolve, reject){
		request('HEAD', updatedSongUrl)
		.then(function (res) {
			if(res.statusCode == 200)
				resolve(updatedSongUrl)
			else
				resolve(songUrl)
		})
		.catch(function (e) {
			resolve(songUrl)
		})
	})
}

function check(songInfo) {
	return new Promise(function (resolve, reject){
		track(songInfo)
		.then(function(songUrl){
			return improve(songUrl)
		})
		.then(function(songUrl){
			resolve(songUrl)
		})
		.catch(function(e){
			resolve()
		})
	})
}

module.exports = {
	check: check
}
