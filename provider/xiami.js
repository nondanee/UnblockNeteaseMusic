const url = require('url')
const {httpRequest, httpsRequest} = require('./request.js')

var headers = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.9',
	'Origin': 'http://m.xiami.com/',
	'Referer': 'http://m.xiami.com/',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

function caesar(location){
	var num = location[0]
	var avg_len = Math.floor(location.slice(1).length / num)
	var remainder = location.slice(1).length % num

	var result = []
	for (var i=0; i<remainder; i++) {
		var line = location.slice(i * (avg_len + 1) + 1, (i + 1) * (avg_len + 1) + 1)
		result.push(line)
	}

	for (var i=0; i<num-remainder; i++) {
		var line = location.slice((avg_len + 1) * remainder).slice(i * avg_len + 1, (i + 1) * avg_len + 1)
		result.push(line)
	}

	var s = [];
	for (var i=0; i< avg_len; i++) {
		for (var j=0; j<num; j++){
			s.push(result[j][i])
		}
	}

	for (var i=0; i<remainder; i++) {
		s.push(result[i].slice(-1))
	}

	return unescape(s.join('')).replace(/\^/g, '0')
}

function search(keyword) {
	var urlObj = url.parse(
		'http://api.xiami.com/web?v=2.0&app_key=1' + 
		'&key=' + encodeURIComponent(keyword) + '&page=1' +
		'&limit=20&callback=jsonp154&r=search/songs'
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
		options.port = 80
		options.path = urlObj.path
	}

	return new Promise(function (resolve, reject){
		httpRequest(options)
		.then(function (body) {
			body = body.slice('jsonp154('.length, -')'.length)
			var jsonBody = JSON.parse(body)
			var chief = jsonBody['data']['songs'][0]
			if(chief){
				resolve(chief.song_id)
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
		'https://www.xiami.com/song/playlist/id/' + id +
		'/object_name/default/object_id/0/cat/json'
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
			var jsonBody = JSON.parse(body)
			if (jsonBody.data.trackList == null){
				reject()
			}
			else{
				var location = jsonBody.data.trackList[0].location
				var songUrl = 'http:' + caesar(location)
				resolve(songUrl)
			}
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