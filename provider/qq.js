const cache = require('./cache')()
const request = require('../request')

let extraHeaders = {
	'origin': 'http://y.qq.com/',
	'referer': 'http://y.qq.com/'
}

const playable = song => {
	let switchFlag = song['switch'].toString(2).split('')
	switchFlag.pop()
	switchFlag.reverse()
	let playFlag = switchFlag[0]
	let tryFlag = switchFlag[13]
	return ((playFlag == 1) || ((playFlag == 1) && (tryFlag == 1)))
}

const search = info => {
	let url =
		'http://i.y.qq.com/s.music/fcgi-bin/search_for_qq_cp?' + 
		'g_tk=938407465&uin=0&format=jsonp&inCharset=utf-8' + 
		'&outCharset=utf-8&notice=0&platform=h5&needNewCode=1' + 
		'&w=' + encodeURIComponent(info.keyword) + '&zhidaqu=1&catZhida=1' + 
		'&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1' + 
		'&remoteplace=txt.mqq.all&_=1459991037831&jsonpCallback=jsonp4'

	// let url = 
	// 	'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?' + 
	// 	'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center' + 
	// 	'&searchid=46804741196796149&t=0&aggr=1&cr=1&catZhida=1&lossless=0'
	// 	'&flag_qc=0&p=1&n=20&w=' + encodeURIComponent(info.keyword) + 	
	// 	'&g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&' +
	// 	'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body.slice('jsonp4('.length, -')'.length))
		let chief = jsonBody['data']['song']['list'][0]
		if(playable(chief))
			return chief.songmid
		else
			return Promise.reject()
	})
}

const ticket = () => {
	const id = '003OUlho2HcRHC'
	let url =
		'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
		'?g_tk=195219765&jsonpCallback=MusicJsonCallback004680169373158849' + 
		'&loginUin=1297716249&hostUin=0&format=json&inCharset=utf8' + 
		'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' + 
		'&cid=205361747&callback=MusicJsonCallback004680169373158849' + 
		'&uin=1297716249&songmid='+ id +
		'&filename=C400'+ id + '.m4a&guid=7332953645'
	
	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body.slice(response.body.indexOf('(') + 1, response.body.length - 1))
		return jsonBody.data.items[0].vkey
	})
}

const track = id => {
	return cache(ticket, 'vkey')
	.then(vkey => {
		// let songUrl = 
		// 	'http://dl.stream.qqmusic.qq.com/C400' + id +
		// 	'.m4a?vkey=' + vkey +
		// 	'&uin=1297716249&fromtag=0&guid=7332953645'
		let songUrl = 
			'http://dl.stream.qqmusic.qq.com/M800' + id + 
			'.mp3?vkey=' + vkey + 
			'&uin=0&fromtag=53&guid=7332953645'
		return songUrl
	})
}

const check = info => cache(search, info).then(id => track(id)).catch(() => {})

module.exports = {check}