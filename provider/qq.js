const request = require('../request.js')

var extraHeaders = {
	'Origin': 'http://y.qq.com/',
	'Referer': 'http://y.qq.com/'
}

function playable(song){
	var switchFlag = song['switch'].toString(2).split('')
	switchFlag.pop()
	switchFlag.reverse()
	var playFlag = switchFlag[0]
	var tryFlag = switchFlag[13]
	return ((playFlag == 1) || ((playFlag == 1) && (tryFlag == 1)))
}

function search(songInfo){
	var uri = 
		'http://i.y.qq.com/s.music/fcgi-bin/search_for_qq_cp?' + 
		'g_tk=938407465&uin=0&format=jsonp&inCharset=utf-8' + 
		'&outCharset=utf-8&notice=0&platform=h5&needNewCode=1' + 
		'&w=' + encodeURIComponent(songInfo.keyword) + '&zhidaqu=1&catZhida=1' + 
		'&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1' + 
		'&remoteplace=txt.mqq.all&_=1459991037831&jsonpCallback=jsonp4'

	return new Promise(function(resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function(body){
			var jsonBody = JSON.parse(body.slice('jsonp4('.length, -')'.length))
			var chief = jsonBody['data']['song']['list'][0]
			if(playable(chief))
				resolve(chief.songmid)
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
		'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
		'?g_tk=195219765&jsonpCallback=MusicJsonCallback004680169373158849' + 
		'&loginUin=1297716249&hostUin=0&format=json&inCharset=utf8' + 
		'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' + 
		'&cid=205361747&callback=MusicJsonCallback004680169373158849' + 
		'&uin=1297716249&songmid='+ id +
		'&filename=C400'+ id + '.m4a&guid=7332953645'

	return new Promise(function(resolve, reject){
		request('GET', uri, extraHeaders)
		.then(function(body){
			var jsonBody = JSON.parse(body.slice(body.indexOf('(')+1,body.length-1))
			var vkey = jsonBody.data.items[0].vkey
			// var songUrl = 
			// 	'http://dl.stream.qqmusic.qq.com/C400' + id +
			// 	'.m4a?vkey=' + vkey +
			// 	'&uin=1297716249&fromtag=0&guid=7332953645'
			var songUrl = 
				'http://dl.stream.qqmusic.qq.com/M800' + id + 
				'.mp3?vkey=' + vkey + 
				'&uin=0&fromtag=53&guid=7332953645'
			resolve(songUrl)
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
			resolve()
		})
	})
}

module.exports = {
	check: check
}