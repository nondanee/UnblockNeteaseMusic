const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const request = require('../request')

const headers = {
	'origin': 'http://y.qq.com/',
	'referer': 'http://y.qq.com/',
	'cookie': process.env.QQ_COOKIE || null // 'uin=; qm_keyst=',
}

const playable = song => {
	const switchFlag = song['switch'].toString(2).split('')
	switchFlag.pop()
	switchFlag.reverse()
	const playFlag = switchFlag[0]
	const tryFlag = switchFlag[13]
	return ((playFlag == 1) || ((playFlag == 1) && (tryFlag == 1)))
}

const format = song => ({
	id: {song: song.mid, file: song.file.media_mid},
	name: song.name,
	duration: song.interval * 1000,
	album: {id: song.album.mid, name: song.album.name},
	artists: song.singer.map(({mid, name}) => ({id: mid, name}))
})

const search = info => {
	const url =
		'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?' +
		'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&' +
		'searchid=46804741196796149&t=0&aggr=1&cr=1&catZhida=1&lossless=0&' +
		'flag_qc=0&p=1&n=20&w=' + encodeURIComponent(info.keyword) + '&' +
		'g_tk=5381&jsonpCallback=MusicJsonCallback10005317669353331&loginUin=0&hostUin=0&' +
		'format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'

	return request('GET', url)
	.then(response => response.jsonp())
	.then(jsonBody => {
		const list = jsonBody.data.song.list.map(format)
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
}

const single = (id, format) => {
	// const classic = ['001yS0N33yPm1B', '000bog5B2DYgHN', '002bongo1BDtKz', '004RDW5Q2ol2jj', '001oEME64eXNbp', '001e9dH11YeXGp', '0021onBk2QNjBu', '001YoUs11jvsIK', '000SNxc91Mw3UQ', '002k94ea4379uy']
	// id = id || classic[Math.floor(classic.length * Math.random())]
	const uin = ((headers.cookie || '').match(/uin=(\d+)/) || [])[1] || '0'

	const concatenate = vkey => {
		if (!vkey) return Promise.reject()
		const host = ['streamoc.music.tc.qq.com', 'mobileoc.music.tc.qq.com', 'isure.stream.qqmusic.qq.com', 'dl.stream.qqmusic.qq.com', 'aqqmusic.tc.qq.com/amobile.music.tc.qq.com'][3]
		return `http://${host}/${format.join(id.file)}?vkey=${vkey}&uin=0&fromtag=8&guid=7332953645`
	}

	// const url =
	// 	'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg' +
	// 	'?g_tk=0&loginUin=0&hostUin=0&format=json&inCharset=utf8' +
	// 	'&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' +
	// 	'&cid=205361747&uin=0&guid=7332953645' +
	// 	'&songmid='+ id.song + '&filename='+ format.join(id.file)

	// return request('GET', url, headers)
	// .then(response => response.json())
	// .then(jsonBody => {
	// 	const {vkey} = jsonBody.data.items[0]
	// 	return concatenate(vkey)
	// })

	const url =
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
					filename: [format.join(id.file)],
					songmid: [id.song],
					songtype: [0],
					uin,
					platform: '20'
				}
			}
		}))

	return request('GET', url, headers)
	.then(response => response.json())
	.then(jsonBody => {
		const { sip, midurlinfo } = jsonBody.req_0.data
		// const vkey =
		// 	jsonBody.req_0.data.midurlinfo[0].vkey ||
		// 	(jsonBody.req_0.data.testfile2g.match(/vkey=(\w+)/) || [])[1]
		// return concatenate(vkey)
		return midurlinfo[0].purl ? sip[0] + midurlinfo[0].purl : Promise.reject()
	})
}

const track = id => {
	id.key = id.file
	return Promise.all(
		[['F000', '.flac'], ['M800', '.mp3'], ['M500', '.mp3']].slice((headers.cookie || typeof(window) !== 'undefined') ? (select.ENABLE_FLAC ? 0 : 1) : 2)
		.map(format => single(id, format).catch(() => null))
	)
	.then(result => result.find(url => url) || Promise.reject())
	.catch(() => insure().qq.track(id))

	// return request(
	// 	'POST', 'http://acc.music.qq.com/base/fcgi-bin/fcg_music_express_mobile2.fcg', {},
	// 	`<root>
	// 		<uid></uid><sid></sid><v>90</v><cv>70003</cv><ct>19</ct><OpenUDID>0</OpenUDID>
	// 		<mcc>460</mcc><mnc>01</mnc><chid>001</chid><webp>0</webp><gray>0</gray><patch>105</patch>
	// 		<jailbreak>0</jailbreak><nettype>2</nettype><qq>12345678</qq><authst></authst><localvip>2</localvip>
	// 		<cid>352</cid><platform>ios</platform><musicname>M800${id}.mp3</musicname><downloadfrom>0</downloadfrom>
	// 	</root>`.replace(/\s/, '')
	// )
	// .then(response => response.body(true))
	// .then(body => {
	// 	const xml = require('zlib').inflateSync(body.slice(5)).toString()
	// 	const focus = xml.match(/<item name="(.+)">(.+)<\/item>/)
	// 	return `http://streamoc.music.tc.qq.com/${focus[1]}?vkey=${focus[2]}&guid=0&uin=12345678&fromtag=6`
	// })

	// const url =
	// 	'https://i.y.qq.com/v8/playsong.html?ADTAG=newyqq.song&songmid=' + id

	// const mobile = {'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'}
	// return request('GET', url, mobile)
	// .then(response => response.body())
	// .then(body => {
	// 	const audio = body.match(/<audio[^>]+src="([^"]+)"[^>]*>/)
	// 	if (audio)
	// 		return audio[1].replace(/C400(\w+)\.m4a/, 'M500$1.mp3')
	// 	else
	// 		return Promise.reject()
	// })
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}