const url = require('url')
const {httpRequest, httpsRequest} = require('./request.js')

var headers = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.9',
	'Origin': 'http://y.qq.com/',
	'Referer': 'http://y.qq.com/',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

function isPlayable(song) {
	var switchFlag = song['switch'].toString(2).split('')
	switchFlag.pop()
	switchFlag.reverse()
	var playFlag = switchFlag[0]
	var tryFlag = switchFlag[13]
	return ((playFlag == 1) || ((playFlag == 1) && (tryFlag == 1)))
}

function search(keyword) {
	var urlObj = url.parse(
		'http://i.y.qq.com/s.music/fcgi-bin/search_for_qq_cp?' + 
		'g_tk=938407465&uin=0&format=jsonp&inCharset=utf-8' + 
		'&outCharset=utf-8&notice=0&platform=h5&needNewCode=1' + 
		'&w=' + encodeURIComponent(keyword) + '&zhidaqu=1&catZhida=1' + 
		'&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1' + 
		'&remoteplace=txt.mqq.all&_=1459991037831&jsonpCallback=jsonp4'
	)

	headers['Host'] = urlObj.host

	var options = {
		method: 'GET',
		headers: headers
	}

	if(proxy){
		options.hostname = proxy.hostname
		options.port = proxy.port
		options.path = urlObj.href
	}
	else{
		options.hostname = urlObj.hostname 
		options.port = urlObj.port || 80
		options.path = urlObj.path
	}

	return new Promise(function (resolve, reject){
		httpRequest(options)
		.then(function (body) {
			body = body.slice('jsonp4('.length, -')'.length)
			var jsonBody = JSON.parse(body)
			var chief = jsonBody['data']['song']['list'][0]
			if(isPlayable(chief)){
				resolve(chief.songmid)
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


function track(id) {
	var urlObj = url.parse(
		'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
		'?g_tk=195219765&jsonpCallback=MusicJsonCallback004680169373158849' + 
		'&loginUin=1297716249&hostUin=0&format=json&inCharset=utf8' + 
		'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' + 
		'&cid=205361747&callback=MusicJsonCallback004680169373158849' + 
		'&uin=1297716249&songmid='+ id +
		'&filename=C400'+ id + '.m4a&guid=7332953645'
	)

	headers['Host'] = urlObj.host

	var options = {
		method: 'GET',
		headers: headers
	}

	return new Promise(function (resolve, reject){

		if(proxy){
			options.hostname = proxy.hostname
			options.port = proxy.port
			options.path = urlObj.href

			httpRequest(options)
			.then(function (body) {
				parse(body)
			})
			.catch(function (e) {
				reject(e)
			})
		}
		else{
			options.hostname = urlObj.hostname 
			options.port = 443
			options.path = urlObj.path

			httpsRequest(options)
			.then(function (body) {
				parse(body)
			})
			.catch(function (e) {
				reject(e)
			})
		}

		function parse(body){
			body = body.slice(body.indexOf('(')+1,body.length-1)
			var jsonBody = JSON.parse(body)
			var token = jsonBody.data.items[0].vkey
			var songUrl = (
				'http://dl.stream.qqmusic.qq.com/C400' + id +
				'.m4a?vkey=' + token +
				'&uin=1297716249&fromtag=0&guid=7332953645'
			)
			resolve(songUrl)
		}
	})
}

function check(keyword){
	return new Promise(function (resolve, reject){
		search(keyword)
		.then(function(songId){
			track(songId)
			.then(function(songUrl){
				resolve(songUrl)
			})
			.catch(function(){
				resolve()
			})
		})
		.catch(function(){
			resolve()
		})
	})
}

module.exports = {
	check: check
}