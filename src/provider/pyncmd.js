const cache = require('../cache')
const select = require('./select')
const request = require('../request')

const track = info => {
	const url =
		'https://mos9527.tooo.top/ncm/pyncm/track/GetTrackAudio?song_ids=' + info.id + '&bitrate=' +
		['999000', '320000'].slice(select.ENABLE_FLAC ? 0 : 1, select.ENABLE_FLAC ? 1 : 2)
	return request('GET', url)
	.then(response => response.body())
	.then(body => {
		const jsonBody = JSON.parse(body)
		const matched = jsonBody.data.find(song => song.id === info.id)
		if (matched)
			return matched.url
		else
			return Promise.reject()
	})
}

const check = info => cache(track, info)

module.exports = {check}
