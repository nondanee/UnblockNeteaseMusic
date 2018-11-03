const request = require('../request')

let extraHeaders = {
	'cookie': 'user_from=2;XMPLAYER_addSongsToggler=0;XMPLAYER_isOpen=0;_xiamitoken=cb8bfadfe130abdbf5e2282c30f0b39a;',
	'origin': 'http://www.xiami.com/',
	'referer': 'http://www.xiami.com/'
}

const caesar = pattern => {
	let height = pattern[0]
	pattern = pattern.slice(1)
	let width = Math.floor(pattern.length / height)
	let extra = pattern.length - width * height

	let distributed = Array.apply(null, {length: height}).map((_, i) => {
		return pattern.slice(i < extra ? i * (width + 1) : extra * (width + 1) + (i - extra) * width).slice(0, width)
	})

	let rotated = Array.apply(null, {length: width}).map((_, x) => {
		return Array.apply(null, {length: height}).map((_, y) => distributed[y][x]).join('')
	})

	return unescape(rotated.join('')).replace(/\^/g, '0')
}

const search = info => {
	let url =
		'http://api.xiami.com/web?v=2.0&app_key=1' + 
		'&key=' + encodeURIComponent(info.keyword) + '&page=1' +
		'&limit=20&callback=jsonp154&r=search/songs'

	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body.slice('jsonp154('.length, -')'.length))
		let chief = jsonBody['data']['songs'][0]
		if(chief){
			if(chief.listen_file)
				return chief.listen_file
			else
				return chief.song_id
		}
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'https://www.xiami.com/song/playlist/id/' + id +
		'/object_name/default/object_id/0/cat/json'

	return request('GET', url, extraHeaders)
	.then(response => {
		let jsonBody = JSON.parse(response.body)
		if(jsonBody.data.trackList == null){
			return Promise.reject()
		}
		else{
			let location = jsonBody.data.trackList[0].location
			let songUrl = 'http:' + caesar(location)
			return songUrl
		}
	})
}

const improve = origin => {
	let updated = origin.replace('m128','m320')
	return request('HEAD', updated)
	.then(response => response.status == 200 ? updated : origin)
	.catch(e => origin)
}

const check = info => search(info).then(id => (typeof(id) === 'number' ? track(id) : id)).then(url => improve(url)).catch(e => {})

module.exports = {check}