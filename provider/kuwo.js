const request = require('../request.js')

function search(songInfo){
	var uri = 
		'http://search.kuwo.cn/r.s?' +
		'ft=music&itemset=web_2013&client=kt' +
		'&rformat=json&encoding=utf8' +
		'&all=' + encodeURIComponent(songInfo.keyword) + '&pn=0&rn=20'

	return new Promise(function(resolve, reject){
		request('GET', uri)
		.then(function(body){
			var jsonBody = JSON.parse(body.replace(/(\')/g, '"'))
			var chief = jsonBody['abslist'][0]
			if(chief)
				resolve(chief.MUSICRID.split('_').pop())
			else
				reject()
		})
		.catch(function(e){
			reject(e)
		})
	})
}

function track(id){
	var uri = 
		'http://antiserver.kuwo.cn/anti.s?' +
		'type=convert_url&format=aac|mp3|wma&response=url&rid=MUSIC_' + id

	return new Promise(function(resolve, reject){
		request('GET', uri)
		.then(function(body){
			if (body)
				resolve(body)
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