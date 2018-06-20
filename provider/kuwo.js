const url = require('url')
const {httpRequest, httpsRequest} = require('./request.js')

var headers = {
	'Accept': 'application/json, text/plain, */*',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'zh-CN,zh;q=0.9',
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

function search(songInfo) {
	var keyword = songInfo.name + ' - ' + songInfo.artists[0].name
	var urlObj = url.parse(
		'http://search.kuwo.cn/r.s?' +
		'ft=music&itemset=web_2013&client=kt' +
		'&rformat=json&encoding=utf8' +
		'&all=' + encodeURIComponent(keyword) + '&pn=1&rn=20'
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
			var jsonBody = JSON.parse(body.replace(/(\')/g, '"'))
			var chief = jsonBody['abslist'][0]
			if(chief){
				resolve(chief.MUSICRID.split('_').pop())
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
		'http://antiserver.kuwo.cn/anti.s?' +
		'type=convert_url&format=aac|mp3|wma&response=url&rid=MUSIC_' + id
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
			if (body)
				resolve(body)
			else
				reject()
		}
	})
}

function check(songInfo){
	return new Promise(function (resolve, reject){
		search(songInfo)
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