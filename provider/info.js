const request = require('../request.js')

var extraHeaders = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
	'Host': 'music.163.com',
	'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Mobile Safari/537.36'
}

function info(id){
	var uri = 
		'https://music.163.com/m/song?id=' + id

	return new Promise(function (resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function (body) {
			var part = body.match(/window\.REDUX_STATE = ([^;]+);/)[1]
			var jsonBody = JSON.parse(part)
			var songInfo = jsonBody['Song']['info']['song']
			songInfo.keyword = songInfo.name + ' - ' + songInfo.artists[0].name
			resolve(songInfo)
		})
		.catch(function (e) {
			reject(e)
		})
	})
}

module.exports = info