const url = require('url')
const crypto = require('crypto')
const {httpRequest, httpsRequest} = require('./request.js')

var headers = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.9',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

function search(keyword) {
	var urlObj = url.parse(
		'http://songsearch.kugou.com/' +
		'song_search_v2?keyword=' + encodeURIComponent(keyword) + '&page=1'
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
			var jsonBody = JSON.parse(body)
			var chief = jsonBody['data']['lists'][0]
			if(chief)
				resolve(chief.FileHash)
			else
				reject()
		})
		.catch(function (e) {
			reject(e)
		})
	})
}


function track(id) {
	var md5 = crypto.createHash('md5')
	var urlObj = url.parse(
		'http://trackercdnbj.kugou.com/i/v2/?cmd=23&pid=1&behavior=download' +
		'&hash=' + id  + '&key=' + md5.update(id + 'kgcloudv2').digest('hex')
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
			parse(body)
		})
		.catch(function (e) {
			reject(e)
		})
		
		function parse(body){
			var jsonBody = JSON.parse(body)
			if (jsonBody.status == '1') 
				resolve(jsonBody.url)
			else 
				reject()
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