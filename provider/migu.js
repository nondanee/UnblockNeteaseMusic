const cache = require('../cache')
const insure = require('./insure')
const crypto = require('../crypto')
const request = require('../request')

let headers = {
	'origin': 'http://music.migu.cn/',
	'referer': 'http://music.migu.cn/'
}

const search = info => {
	let url =
		'http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?' +
		'text=' + encodeURIComponent(info.keyword) + '&pageNo=1&pageSize=20&' +
		'searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":0}'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		let match = jsonBody.songResultData.result[0]
		if(match)
			return match.copyrightId
		else
			return Promise.reject()
	})
}

const track = id => {
	let url =
		'http://music.migu.cn/v3/api/music/audioPlayer/getPlayInfo?' +
		'dataType=2&' + crypto.miguapi.encrypt({copyrightId: id.toString()})

	return request('GET', url, headers)
	.then(response => response.json())
	.then(jsonBody => {
		let playInfo = [/*'sqPlayInfo'*/, 'hqPlayInfo', 'bqPlayInfo'].find(key => (key in jsonBody.data) && jsonBody.data[key].playUrl)
		if(playInfo)
			return encodeURI(jsonBody.data[playInfo].playUrl)
		else
			return Promise.reject()
	})
	.catch(() => insure().migu.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}