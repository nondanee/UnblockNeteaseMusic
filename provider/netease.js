const cache = require('../cache')
const crypto = require('../crypto')
const request = require('../request')

const search = info => {
	const url =
		'http://music.163.com/api/album/' + info.album.id

	return request('GET', url)
	.then(response => response.body())
	.then(body => {
		const jsonBody = JSON.parse(body.replace(/"dfsId":(\d+)/g, '"dfsId":"$1"')) // for js precision
		const matched = jsonBody.album.songs.find(song => song.id === info.id)
		if (matched)
			return matched.hMusic.dfsId || matched.mMusic.dfsId || matched.lMusic.dfsId
		else
			return Promise.reject()
	})
}

const track = id => {
	if (!id || id === '0') return Promise.reject()
	return crypto.uri.retrieve(id)
}

const check = info => cache(search, info).then(track)

module.exports = {check}