const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const crypto = require('../crypto')
const request = require('../request')

const format = song => {
	// const SingerName = song.SingerName.split('、')
	const singername = song.singername.split('、')
	return {
		// id: song.FileHash,
		// name: song.SongName,
		// duration: song.Duration * 1000,
		// album: {id: song.AlbumID, name: song.AlbumName},
		// artists: song.SingerId.map((id, index) => ({id, name: SingerName[index]}))
		id: song.hash.toUpperCase(),
		name: song.songname,
		duration: song.duration * 1000,
		album: {id: song.album_id, name: song.album_name}
	}
}

const search = info => {
	const url =
		// 'http://songsearch.kugou.com/song_search_v2?' +
		'http://mobilecdn.kugou.com/api/v3/search/song?' +
		'keyword=' + encodeURIComponent(info.keyword) + '&page=1&pagesize=10'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		// const list = jsonBody.data.lists.map(format)
		const list = jsonBody.data.info.map(format)
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
	.catch(() => insure().kugou.search(info))
}

const track = id => {
	// const url =
	// 	'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=' + id

	// return request('GET', url)
	// .then(response => response.json())
	// .then(jsonBody => jsonBody.url || Promise.reject())

	const url =
		'http://trackercdn.kugou.com/i/v2/?' +
		'key=' + crypto.md5.digest(`${id}kgcloudv2`) + '&hash=' + id + '&' +
		'br=hq&appid=1005&pid=2&cmd=25&behavior=play'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => jsonBody.url[0] || Promise.reject())
}

const check = info => cache(search, info).then(track)

module.exports = {check, search}
