const request = require('../request')

const search = info => {
	let url =
		// 'http://search.kuwo.cn/r.s?' +
		// 'ft=music&itemset=web_2013&client=kt&' +
		// 'rformat=json&encoding=utf8&' +
		// 'all=' + encodeURIComponent(info.keyword) + '&pn=0&rn=20'
		'http://search.kuwo.cn/r.s?' +
		'ft=music&rformat=json&encoding=utf8&' +
		'rn=8&callback=song&vipver=MUSIC_8.0.3.1&' +
		'SONGNAME=' + encodeURIComponent(info.name) + '&' +
		'ARTIST=' + encodeURIComponent(info.artists[0].name)

	return request('GET', url)
	.then(response => {
		let jsonBody = JSON.parse(response.body.replace(/\'/g, '"').replace('try {var jsondata =', '').replace(';song(jsondata);}catch(e){jsonError(e)}', ''))
		let chief = jsonBody['abslist'][0]
		if(chief)
			return chief.MUSICRID.split('_').pop()
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'http://antiserver.kuwo.cn/anti.s?' +
		'type=convert_url&format=mp3&response=url&rid=MUSIC_' + id
		// 'type=convert_url&format=aac|mp3|wma&response=url&rid=MUSIC_' + id

	return request('GET', url)
	.then(response => {
		if(response.body.startsWith('http'))
			return response.body
		else
			return Promise.reject()
	})
}

const check = info => search(info).then(id => track(id)).catch(e => {})

module.exports = {check}