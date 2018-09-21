const request = require('../request.js')

var extraHeaders = {
	'origin': 'http://www.joox.com',
	'referer': 'http://www.joox.com'
}

function fit(songInfo){
	if(/[\u0800-\u4e00]/.test(songInfo.name))//is japanese
		return songInfo.name
	else
		return songInfo.keyword
}

function search(songInfo){
	var keyword = fit(songInfo)
	var uri = 
		'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 
		'country=hk&lang=zh_TW&' + 
		'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30'

	return new Promise(function(resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function(body){
			var jsonBody = JSON.parse(body.replace(/(\')/g, '"'))
			var chief = jsonBody['itemlist'][0]
			if(chief)
				resolve(chief.songid)
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
		'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 
		'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 
		'channel_id=-1&_=' + (new Date).getTime()

	return new Promise(function(resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function(body){
			var jsonBody = JSON.parse(body.slice(body.indexOf('(')+1,body.length-1))
			var songUrl = jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl
			if (songUrl)
				resolve(songUrl)
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
		.catch(function(e){
			console.log(e)
			resolve()
		})
	})
}

module.exports = {
	check: check
}