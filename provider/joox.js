const request = require('../request')

let extraHeaders = {
	'origin': 'http://www.joox.com',
	'referer': 'http://www.joox.com'
}

const fit = info => {
	if(/[\u0800-\u4e00]/.test(info.name)) //is japanese
		return info.name
	else
		return info.keyword
}

const search = info => {
	let keyword = fit(info)
	let url =
		'http://api-jooxtt.sanook.com/web-fcgi-bin/web_search?' + 
		'country=hk&lang=zh_TW&' + 
		'search_input=' + encodeURIComponent(keyword) + '&sin=0&ein=30'

	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body.replace(/(\')/g, '"'))
		let chief = jsonBody['itemlist'][0]
		if(chief)
			return chief.songid
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'http://api.joox.com/web-fcgi-bin/web_get_songinfo?' + 
		'songid=' + id + '&country=hk&lang=zh_cn&from_type=-1&' + 
		'channel_id=-1&_=' + (new Date).getTime()

	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body.slice(response.body.indexOf('(') + 1, response.body.length - 1))
		let songUrl = jsonBody.r320Url || jsonBody.r192Url || jsonBody.mp3Url || jsonBody.m4aUrl
		if(songUrl)
			return songUrl
		else
			return Promise.reject()
	})
}

const check = info => search(info).then(id => track(id)).catch(e => {})

module.exports = {check}