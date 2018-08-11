const request = require('../request.js')

var extraHeaders = {
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
	'host': 'music.163.com',
	'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
}

function info(id){
	var uri = 
		'https://music.163.com/m/song?id=' + id

	return new Promise(function(resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function(body){
			var part = body.match(/window\.REDUX_STATE = ([^;]+);/)[1]
			var jsonBody = JSON.parse(part)
			var songInfo = jsonBody['Song']['info']['song']
			songInfo.keyword = songInfo.name + ' - ' + songInfo.artists[0].name
			resolve(songInfo)
		})
		.catch(function(e){
			reject(e)
		})
	})
}

module.exports = info