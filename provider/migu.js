const request = require('../request.js')

function search(songInfo) {
	var uri = 
		'http://m.10086.cn/migu/remoting/scr_search_tag?' + 
		'keyword=' + encodeURIComponent(songInfo.keyword) + '&type=2&rows=20&pgc=1'

	return new Promise(function (resolve, reject){
		request('GET', uri)
		.then(function (body) {
			var jsonBody = JSON.parse(body)
			if('musics' in jsonBody){
				var chief = jsonBody['musics'][0]
				resolve(chief.mp3)
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

function check(songInfo) {
	return new Promise(function (resolve, reject){
		search(songInfo)
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