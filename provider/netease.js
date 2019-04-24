const cache = require('../cache')
const crypto = require('../crypto')
const request = require('../request')

const search = info => {
	let url =
		'http://music.163.com/api/album/' + info.album.id

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		let matched = jsonBody.album.songs.find(song => song.id === info.id)
		if(matched)
			return matched.hMusic.dfsId || matched.mMusic.dfsId || matched.lMusic.dfsId
		else
			return Promise.reject()
	})
}

const track = id => {
	if(!id) return Promise.reject()
	let songUrl = crypto.reverse.url(id)
	return songUrl.replace(/(\w\d+?)(?!c)\.music\.126\.net/, '$1c.music.126.net')
}

const check = info => cache(search, info).then(track)

module.exports = {check}