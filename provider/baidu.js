const cache = require('../cache')
const request = require('../request')

const search = info => {
	let url =
		'http://sug.music.baidu.com/info/suggestion?' + 
		'word=' + encodeURIComponent(info.keyword) + '&version=2&from=0'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		if('data' in jsonBody){
			let chief = jsonBody['data']['song'][0]
			return chief.songid
		}
		else{
			return Promise.reject()
		}
	})
}

const track = id => {
	let url =
		'http://music.taihe.com/data/music/fmlink?' +
		'songIds=' + id + '&type=mp3'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		if('songList' in jsonBody.data)
			return jsonBody.data.songList[0].songLink
		else
			return Promise.reject()
	})
}

const check = info => cache(search, info).then(track).catch(() => {})

module.exports = {check}