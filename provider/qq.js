const cache = require('../cache')
const insure = require('./insure')
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
		let matched = jsonBody.data.song.list[0]
		if(matched)
			return matched.file.media_mid
		else
			return Promise.reject()
	})
}

const ticket = () => {
	const classic = ['001yS0N33yPm1B', '000bog5B2DYgHN', '002bongo1BDtKz', '004RDW5Q2ol2jj', '001oEME64eXNbp', '001e9dH11YeXGp', '0021onBk2QNjBu', '001YoUs11jvsIK', '000SNxc91Mw3UQ', '002k94ea4379uy']
	const id = classic[Math.floor(classic.length * Math.random())]

	// let url =
	// 	'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
	// 	'?g_tk=0&loginUin=0&hostUin=0&format=json&inCharset=utf8' +
	// 	'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' +
	// 	'&cid=205361747&uin=0&guid=7332953645' +
	// 	'&songmid='+ id + '&filename=C400'+ id + '.m4a'

	// return request('GET', url, headers)
	// .then(response => response.json())
	// .then(jsonBody => {
	// 	let vkey = jsonBody.data.items[0].vkey
	// 	if(vkey)
	// 		return vkey
	// 	else
	// 		return Promise.reject()
	// })
	// .catch(() => insure().qq.ticket())

	let url =
		'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' +
		encodeURIComponent(JSON.stringify({
			// req: {
			// 	method: 'GetCdnDispatch',
			// 	module: 'CDN.SrfCdnDispatchServer',
			// 	param: {
			// 		calltype: 0,
			// 		guid: '7332953645',
			// 		userip: ''
			// 	}
			// },
			req_0: {
				module: 'vkey.GetVkeyServer',
				method: 'CgiGetVkey',
				param: {
					guid: '7332953645',
					loginflag: 1,
					songmid: [id],
					songtype: [0],
					uin: '0',
					platform: '20'
				}
			}
		}))

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		let vkey = 
			jsonBody.req_0.data.midurlinfo[0].vkey ||
			(jsonBody.req_0.data.testfile2g.match(/vkey=(\w+)/) || [])[1]
		if(vkey)
			return vkey
		else
			return Promise.reject()
	})
	.catch(() => insure().qq.ticket())
}

const track = id => {
	return cache(ticket)
	.then(vkey => {
		let host = ['streamoc.music.tc.qq.com', 'isure.stream.qqmusic.qq.com', 'dl.stream.qqmusic.qq.com', '183.131.60.16/amobile.music.tc.qq.com'][0]
		let songUrl =
			'http://' + host + '/M500' + id +
			'.mp3?vkey=' + vkey +
			'&uin=0&fromtag=8&guid=7332953645'
		return songUrl
	})
}

const check = info => cache(search, info).then(track)

module.exports = {check, ticket}