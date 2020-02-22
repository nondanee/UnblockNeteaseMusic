const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const crypto = require('../crypto')
const request = require('../request')

const headers = {
	'origin': 'http://music.migu.cn/',
	'referer': 'http://music.migu.cn/'
}

const format = song => {
	const singerId = song.singerId.split(/\s*,\s*/)
	const singerName = song.singerName.split(/\s*,\s*/)
	return {
		id: song.copyrightId,
		name: song.title,
		album: {id: song.albumId, name: song.albumName},
		artists: singerId.map((id, index) => ({id, name: singerName[index]}))
	}
}

const search = info => {
	const url =
		'http://m.music.migu.cn/migu/remoting/scr_search_tag?' +
		'keyword=' + encodeURIComponent(info.keyword) + '&type=2&rows=20&pgc=1'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		const list = ((jsonBody || {}).musics || []).map(format)
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
}

const track = id => {
	const url =
		'http://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?' +
		'dataType=2&' + crypto.miguapi.encryptBody({copyrightId: id.toString()})

	return request('GET', url, headers)
	.then(response => response.json())
	.then(jsonBody => {
		const playInfo = ['sqPlayInfo', 'hqPlayInfo', 'bqPlayInfo'].slice(select.ENABLE_FLAC ? 0 : 1).find(key => (key in jsonBody.data) && jsonBody.data[key].playUrl)
		if (playInfo)
			return encodeURI(jsonBody.data[playInfo].playUrl)
		else
			return Promise.reject()
	})
	.catch(() => insure().migu.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}