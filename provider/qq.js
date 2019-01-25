const cache = require('../cache')
const request = require('../request')

let headers = {
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
		'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?' + 
		'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center' + 
		'&searchid=46804741196796149&t=0&aggr=1&cr=1&catZhida=1&lossless=0' +
		'&flag_qc=0&p=1&n=20&w=' + encodeURIComponent(info.keyword) + 
		'&g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0' +
		'&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

	return request('GET', url)
	.then(response => response.jsonp())
	.then(jsonBody => {
		let chief = jsonBody['data']['song']['list'][0]
		if(chief)
			return chief['file']['media_mid']
		else
			return Promise.reject()
	})
}

const ticket = () => {
	const exclusive = ['003OUlho2HcRHC', '0039MnYb0qxYhV', '003aAYrm3GE0Ac', '001J5QJL1pRQYB', '004Z8Ihr0JIu5s', '002MXZNu1GToOk', '002qU5aY3Qu24y', '001xd0HI0X9GNq', '001zMQr71F1Qo8', '0009BCJK1nRaad']
	const id = exclusive[Math.floor(exclusive.length * Math.random())]

	let url =
		'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
		'?g_tk=195219765&jsonpCallback=MusicJsonCallback004680169373158849' + 
		'&loginUin=1297716249&hostUin=0&format=json&inCharset=utf8' + 
		'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' + 
		'&cid=205361747&callback=MusicJsonCallback004680169373158849' + 
		'&uin=1297716249&songmid='+ id +
		'&filename=C400'+ id + '.m4a&guid=7332953645'

	return request('GET', url, headers)
	.then(response => response.jsonp())
	.then(jsonBody => {
		return jsonBody.data.items[0].vkey
	})
	.then(vkey => {
		return vkey ? vkey : request('GET', 'https://public.nondanee.tk/qq/ticket').then(response => response.body())
	})

	// let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' + 
	// 	encodeURIComponent(JSON.stringify({
	// 		req_0: {
	// 			module: 'vkey.GetVkeyServer',
	// 			method: 'CgiGetVkey',
	// 			param: {
	// 				guid: '7332953645',
	// 				songmid: [id],
	// 				songtype: [0],
	// 				uin: '',
	// 				platform: '20'
	// 			}
	// 		}
	// 	}))

	// return request('GET', url).then(response => {
	// 	let jsonBody = JSON.parse(response.body)
	// 	return jsonBody.req_0.data.midurlinfo[0].vkey
	// })
}

const track = id => {
	return cache(ticket, 'vkey')
	.then(vkey => {
		let host = ['streamoc.music.tc.qq.com', 'isure.stream.qqmusic.qq.com', 'dl.stream.qqmusic.qq.com'][0]
		// let songUrl = 
		// 	'http://dl.stream.qqmusic.qq.com/C400' + id +
		// 	'.m4a?vkey=' + vkey +
		// 	'&uin=1297716249&fromtag=0&guid=7332953645'
		let songUrl = 
			'http://' + host + '/M800' + id + 
			'.mp3?vkey=' + vkey + 
			'&uin=0&fromtag=8&guid=7332953645'
		return songUrl
	})
}

const check = info => cache(search, info).then(track).catch(() => {})

module.exports = {check, ticket}