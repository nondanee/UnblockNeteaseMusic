const url = require('url')
const {httpRequest, httpsRequest} = require('./request.js')

function info(id){
	var urlObj = url.parse(`http://music.163.com/m/song?id=${id}`)

	var options = {
		method: 'GET',
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.9',
			'Host': 'music.163.com',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
		}
	}

	if(proxy){
		options.hostname = proxy.hostname
		options.port = proxy.port
		options.path = urlObj.href
	}
	else{
		options.hostname = switchHost(urlObj.hostname)
		options.port = urlObj.port || 80
		options.path = urlObj.path
	}
	
	return new Promise(function (resolve, reject){
		httpRequest(options)
		.then(function (body) {
			var part = body.match(/window\.REDUX_STATE = ([^;]+);/)[1]
			var jsonBody = JSON.parse(part)
			var songInfo = jsonBody['Song']['info']['song']
			resolve(songInfo)
		})
		.catch(function (e) {
			reject(e)
		})
	})
}

module.exports = info