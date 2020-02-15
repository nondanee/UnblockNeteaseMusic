const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const crypto = require('../crypto')
const request = require('../request')

const headers = {
	// 'origin': 'http://www.xiami.com/',
	// 'referer': 'http://www.xiami.com/'
	'referer': 'https://h.xiami.com/'
}

const format = song => ({
	id: song.song_id,
	name: song.song_name,
	album: {id: song.album_id, name: song.album_name},
	artists: [{id: song.artist_id, name: song.artist_name}]
})

const caesar = pattern => {
	const height = parseInt(pattern[0])
	pattern = pattern.slice(1)
	const width = Math.ceil(pattern.length / height)
	const unpad = height - (width * height - pattern.length)

	const matrix = Array.from(Array(height).keys()).map(i =>
		pattern.slice(i < unpad ? i * width : unpad * width + (i - unpad) * (width - 1)).slice(0, i < unpad ? width : width - 1)
	)

	const transpose = Array.from(Array(width).keys()).map(x =>
		Array.from(Array(height).keys()).map(y => matrix[y][x]).join('')
	)

	return unescape(transpose.join('')).replace(/\^/g, '0')
}

const token = () => {
	return request('GET', 'https://www.xiami.com')
	.then(response =>
		response.headers['set-cookie'].map(line => line.replace(/;.+$/, '')).reduce(
			(cookie, line) => (line = line.split(/\s*=\s*/).map(decodeURIComponent), Object.assign(cookie, {[line[0]]: line[1]})), {}
		)
	)
}

// const search = info => {
// 	return cache(token)
// 	.then(cookie => {
// 		const query = JSON.stringify({key: info.keyword, pagingVO: {page: 1, pageSize: 60}})
// 		const message = cookie['xm_sg_tk'].split('_')[0] + '_xmMain_/api/search/searchSongs_' + query
// 		return request('GET', 'https://www.xiami.com/api/search/searchSongs?_q=' + encodeURIComponent(query) + '&_s=' + crypto.md5.digest(message), {
// 			referer: 'https://www.xiami.com/search?key=' + encodeURIComponent(info.keyword),
// 			cookie: Object.keys(cookie).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(cookie[key])).join('; ')
// 		})
// 		.then(response => response.json())
// 		.then(jsonBody => {
// 			const matched = jsonBody.result.data.songs[0]
// 			if (matched)
// 				return matched.songId
// 			else
// 				return Promise.reject()
// 		})
// 	})
// }

const search = info => {
	const url =
		'http://api.xiami.com/web?v=2.0&app_key=1' +
		'&key=' + encodeURIComponent(info.keyword) + '&page=1' +
		'&limit=20&callback=jsonp&r=search/songs'

	return request('GET', url, headers)
	.then(response => response.jsonp())
	.then(jsonBody => {
		const list = jsonBody.data.songs.map(format)
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
}

// const track = id => {
// 	const url =
// 		'https://emumo.xiami.com/song/playlist/id/' + id +
// 		'/object_name/default/object_id/0/cat/json'

// 	return request('GET', url, headers)
// 	.then(response => response.json())
// 	.then(jsonBody => {
// 		if (jsonBody.data.trackList == null) {
// 			return Promise.reject()
// 		}
// 		else {
// 			const location = jsonBody.data.trackList[0].location
// 			const songUrl = 'http:' + caesar(location)
// 			return songUrl
// 		}
// 	})
// 	.then(origin => {
// 		const updated = origin.replace('m128', 'm320')
// 		return request('HEAD', updated)
// 		.then(response => response.statusCode == 200 ? updated : origin)
// 		.catch(() => origin)
// 	})
// 	.catch(() => insure().xiami.track(id))
// }

const track = id => {
	const url =
		'https://api.xiami.com/web?v=2.0&app_key=1' +
		'&id=' + id + '&callback=jsonp&r=song/detail'

	return request('GET', url, headers)
	.then(response => response.jsonp())
	.then(jsonBody =>
		jsonBody.data.song.listen_file || Promise.reject()
	)
	.catch(() => insure().xiami.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}