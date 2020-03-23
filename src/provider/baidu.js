const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const request = require('../request')

const format = song => ({
	id: song.songid,
	name: song.songname,
	album: {},
	artists: song.artistname.split(/\s*,\s*/).map(name => ({name}))
})

// need update (help wanted)
const search = info => {
	const url =
		'http://sug.qianqian.com/info/suggestion?' +
		'word=' + encodeURIComponent(info.keyword) + '&version=2&from=0'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		const list = ((jsonBody.data || {}).song || []).map(format)
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
}

const track = id => {
	const url =
		'http://music.taihe.com/data/music/fmlink?' +
		'songIds=' + id + '&type=mp3'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		if ('songList' in jsonBody.data)
			return jsonBody.data.songList[0].songLink || Promise.reject()
		else
			return Promise.reject()
	})
	.catch(() => insure().baidu.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check}