const cache = require('../cache')
const request = require('../request')
const parse = query => (query || '').split('&').reduce((result, item) => (item = item.split('=').map(decodeURIComponent), Object.assign({}, result, {[item[0]]: item[1]})), {})

// const proxy = require('url').parse('http://127.0.0.1:1080')
const proxy = undefined
const key = process.env.YOUTUBE_KEY || null // YouTube Data API v3

const signature = (id = '-tKVN2mAKRI') => {
	const url =
		`https://www.youtube.com/watch?v=${id}`

	return request('GET', url, {}, null, proxy)
	.then(response => response.body())
	.then(body => {
		let assets = /"assets":{[^}]+}/.exec(body)[0]
		assets = JSON.parse(`{${assets}}`).assets
		return request('GET', 'https://youtube.com' + assets.js, {}, null, proxy).then(response => response.body())
	})
	.then(body => {
		const [_, funcArg, funcBody] = /function\((\w+)\)\s*{([^}]+split\(""\)[^}]+join\(""\))};/.exec(body)
		const helperName = /;(.+?)\..+?\(/.exec(funcBody)[1]
		const helperContent = new RegExp(`var ${helperName}={[\\s\\S]+?};`).exec(body)[0]
		return new Function([funcArg], helperContent + '\n' + funcBody)
	})
}

const apiSearch = info => {
	const url =
		`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`

	return request('GET', url, {accept: 'application/json'}, null, proxy)
	.then(response => response.json())
	.then(jsonBody => {
		const matched = jsonBody.items[0]
		if (matched)
			return matched.id.videoId
		else
			return Promise.reject()
	})
}

const search = info => {
	const url =
		`https://www.youtube.com/results?search_query=${encodeURIComponent(info.keyword)}`

	return request('GET', url, {}, null, proxy)
	.then(response => response.body())
	.then(body => {
		const initialData = JSON.parse(body.match(/window\["ytInitialData"\]\s*=\s*([^;]+);/)[1])
		const matched = initialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
		if (matched)
			return matched.videoRenderer.videoId
		else
			return Promise.reject()
	})
}

const track = id => {
	const url =
		`https://www.youtube.com/get_video_info?video_id=${id}&el=detailpage`

	return request('GET', url, {}, null, proxy)
	.then(response => response.body())
	.then(body => JSON.parse(parse(body).player_response).streamingData)
	.then(streamingData => {
		const stream = streamingData.formats.concat(streamingData.adaptiveFormats)
		.find(format => format.itag === 140)
		// .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
		// .sort((a, b) => b.bitrate - a.bitrate)[0]
		const target = parse(stream.cipher)
		return stream.url || (target.sp.includes('sig') ? cache(signature, undefined, 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url)
	})
}

const check = info => cache(key ? apiSearch : search, info).then(track)

module.exports = {check, track}