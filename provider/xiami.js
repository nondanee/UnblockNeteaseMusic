const cache = require('../cache')
const crypto = require('../crypto')
const request = require('../request')

let headers = {
	'origin': 'http://www.xiami.com/',
	'referer': 'http://www.xiami.com/'
}

const caesar = pattern => {
	let height = pattern[0]
	pattern = pattern.slice(1)
	let width = Math.ceil(pattern.length / height)
	let unpad = height - (width * height - pattern.length)
	
	let matrix = Array.apply(null, {length: height}).map((_, i) => {
		return pattern.slice(i < unpad ? i * width : unpad * width + (i - unpad) * (width - 1)).slice(0, i < unpad ? width : width - 1)
	})

	let transpose = Array.apply(null, {length: width}).map((_, x) => {
		return Array.apply(null, {length: height}).map((_, y) => matrix[y][x]).join('')
	})
	
	return unescape(transpose.join('')).replace(/\^/g, '0')
}

const token = () => {
	return request('GET', 'https://www.xiami.com')
	.then(response => {
		const cookie = {}
		response.headers['set-cookie'].map(line => line.replace(/;.+$/, '')).forEach(line => {
			line = line.split(/\s*=\s*/)
			cookie[decodeURIComponent(line[0])] = decodeURIComponent(line[1])
		})
		return cookie
	})
}

const search = info => {
	return cache(token)
	.then(cookie => {
		const query = JSON.stringify({key: info.keyword, pagingVO: {page: 1, pageSize: 60}})
		const message = cookie['xm_sg_tk'].split('_')[0] + '_xmMain_/api/search/searchSongs_' + query
		return request('GET', 'https://www.xiami.com/api/search/searchSongs?_q=' + encodeURIComponent(query) + '&_s=' + crypto.md5(message), {
			referer: 'https://www.xiami.com/search?key=' + encodeURIComponent(info.keyword),
			cookie: Object.keys(cookie).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(cookie[key])).join('; ')
		})
		.then(response => response.json())
		.then(jsonBody => {
			let chief = jsonBody['result']['data']['songs'][0]
			if(chief)
				return chief.songId
			else
				return Promise.reject()
		})
	})
}

// const search = info => {
// 	let url =
// 		'http://api.xiami.com/web?v=2.0&app_key=1' + 
// 		'&key=' + encodeURIComponent(info.keyword) + '&page=1' +
// 		'&limit=20&callback=jsonp154&r=search/songs'

// 	return request('GET', url, headers)
// 	.then(response => {
// 		let jsonBody = JSON.parse(response.body.slice('jsonp154('.length, -')'.length))
// 		let chief = jsonBody['data']['songs'][0]
// 		if(chief){
// 			if(chief.listen_file)
// 				return chief.listen_file
// 			else
// 				return chief.song_id
// 		}
// 		else
// 			return Promise.reject()
// 	})
// }

const track = id => {
	let url =
		'https://www.xiami.com/song/playlist/id/' + id +
		'/object_name/default/object_id/0/cat/json'

	return request('GET', url, headers)
	.then(response => response.json())
	.then(jsonBody => {
		if(jsonBody.data.trackList == null){
			return Promise.reject()
		}
		else{
			let location = jsonBody.data.trackList[0].location
			let songUrl = 'http:' + caesar(location)
			return songUrl
		}
	})
	.then(origin => {
		let updated = origin.replace('m128', 'm320')
		return request('HEAD', updated)
		.then(response => response.statusCode == 200 ? updated : origin)
		.catch(() => origin)
	})
}

const check = info => cache(search, info).then(track).catch(() => {})

module.exports = {check}