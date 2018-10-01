const request = require('../request.js')

function search(songInfo){
	var url =
		'http://m.10086.cn/migu/remoting/scr_search_tag?' + 
		'keyword=' + encodeURIComponent(songInfo.keyword) + '&type=2&rows=20&pgc=1'

	return request('GET', url)
	.then(function(response){
		var jsonBody = JSON.parse(response.body)
		if('musics' in jsonBody){
			var chief = jsonBody['musics'][0]
			return chief.mp3
		}
		else{
			return Promise.reject()
		}
	})
}

function check(songInfo){
	return search(songInfo)
	.catch(function(e){
		return
	})
}

module.exports = {check}