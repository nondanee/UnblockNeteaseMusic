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
	var url =
		'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 
		'country=hk&lang=zh_TW&' + 
		'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30'

	return request('GET', url, extraHeaders)
	.then(function(response){
		var jsonBody = JSON.parse(response.body.replace(/(\')/g, '"'))
		var chief = jsonBody['itemlist'][0]
		if(chief)
			return chief.songid
		else
			return Promise.reject()
	})
}

function track(id){
	var url =
		'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 
		'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 
		'channel_id=-1&_=' + (new Date).getTime()

	return request('GET', url, extraHeaders)
	.then(function(response){
		var jsonBody = JSON.parse(response.body.slice(response.body.indexOf('(')+1,response.body.length-1))
		var songUrl = jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl
		if (songUrl)
			return songUrl
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