const cache = require('../cache')
const insure = require('./insure')
const request = require('../request')

const search = info => {
	// let url =
	// 	// 'http://search.kuwo.cn/r.s?' +
	// 	// 'ft=music&itemset=web_2013&client=kt&' +
	// 	// 'rformat=json&encoding=utf8&' +
	// 	// 'all=' + encodeURIComponent(info.keyword) + '&pn=0&rn=20'
	// 	'http://search.kuwo.cn/r.s?' +
	// 	'ft=music&rformat=json&encoding=utf8&' +
	// 	'rn=8&callback=song&vipver=MUSIC_8.0.3.1&' +
	// 	'SONGNAME=' + encodeURIComponent(info.name) + '&' +
	// 	'ARTIST=' + encodeURIComponent(info.artists[0].name)

	// return request('GET', url)
	// .then(response => response.body())
	// .then(body => {
	// 	let jsonBody = eval(
	// 		'(' + body
	// 		.replace(/\n/g, '')
	// 		.match(/try\s*\{[^=]+=\s*(.+?)\s*\}\s*catch/)[1]
	// 		.replace(/;\s*song\s*\(.+\)\s*;\s*/, '') + ')'
	// 	)
	// 	let matched = jsonBody.abslist[0]
	// 	if(matched)
	// 		return matched.MUSICRID.split('_').pop()
	// 	else
	// 		return Promise.reject()
	// })

	const keyword = encodeURIComponent(info.keyword.replace(' - ', ''))
	let url = `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keyword}&pn=1&rn=30`

	return request('GET', `http://kuwo.cn/search/list?key=${keyword}`)
	.then(response => response.headers['set-cookie'].find(line => line.includes('kw_token')).replace(/;.*/, '').split('=').pop())
	.then(token => request('GET', url, {referer: `http://www.kuwo.cn/search/list?key=${keyword}`, csrf: token, cookie: `kw_token=${token}`}))
	.then(response => response.json())
	.then(jsonBody => {
		let matched = jsonBody.data.list[0]
		if(matched)
			return matched.musicrid.split('_').pop()
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'http://antiserver.kuwo.cn/anti.s?' +
		'type=convert_url&format=mp3&response=url&rid=MUSIC_' + id
		// 'http://www.kuwo.cn/url?' +
		// 'format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id

	return request('GET', url)
	.then(response => response.body())
	.then(body => {
		if(body.startsWith('http'))
			return body
		else
			return Promise.reject()
	})
	.catch(() => insure().kuwo.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}
