const cache = require('../cache')
const request = require('../request')
const querystring = require('querystring')

// const proxy = require('url').parse('http://127.0.0.1:1080')
const proxy = undefined
// YouTube Data API v3
const key = undefined

const signature = (id = '-tKVN2mAKRI') => {
	let url =
		`https://www.youtube.com/watch?v=${id}`

	return request('GET', url, {}, null, proxy)
	.then(response => response.body())
	.then(body => {
		let assets = /"assets":{[^}]+}/.exec(body)[0]
		assets = JSON.parse(`{${assets}}`).assets
		return request('GET', 'https://youtube.com' + assets.js, {}, null, proxy).then(response => response.body())
	})
	.then(body => {
		let funcName = /\.set\([^,]*,encodeURIComponent\(([^(]*)\(/.exec(body)[1]
		let [_, funcArgs, funcBody] = new RegExp(funcName + '=function\\((.+?)\\){(.+?)}').exec(body)
		let helperName = /;(.+?)\..+?\(/.exec(funcBody)[1]
		let helperContent = new RegExp('var ' + helperName + '={[\\s\\S]+?};').exec(body)[0]
		return new Function([funcArgs], helperContent + '\n' + funcBody)
	})
}

/**
 * @description 使用 Youtube Data API 搜索
 * @information 需要申请 API key, 当无匹配结果时尝试调用 searchWithoutKey
 */
const search = info => {
	let url =
		`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`

	return request('GET', url, {accept: 'application/json'}, null, proxy)
	.then(response => response.json())
	.then(jsonBody => {
		let matched = jsonBody.items[0]
		if (matched)
			return matched.id.videoId
		else
			return searchWithoutKey(info)
	})
}

/**
 * @description 爬搜索网页，正则匹配，返回第一个视频的 id
 * @information 这里需要使用非 Chrome 的 User-Agent
 */
const searchWithoutKey = info => {
	const query = encodeURIComponent(info.keyword)
	const url = `https://www.youtube.com/results?search_query=${query}&app=desktop`
	const customHeader = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1 WOW64 rv:33.0) Gecko/20120101 Firefox/33.0'}

	return request('GET', url, customHeader, null, proxy)
	.then(response => response.body())
	.then(html => {
		const matched = html.match(/data-context-item-id="(.{11})"/g)[0]
		if (matched) {
			matched.match(/.*="(.{11})"/)
			return RegExp.$1
		}
		return Promise.reject()
	})
}

const track = id => {
	let url =
		`https://www.youtube.com/get_video_info?video_id=${id}&el=detailpage`

	return request('GET', url, {}, null, proxy)
	.then(response => response.body())
	.then(body => JSON.parse(querystring.parse(body).player_response).streamingData)
	.then(streamingData => {
		let stream = streamingData.formats.concat(streamingData.adaptiveFormats)
		.find(format => format.itag === 140)
		// .filter(format => [249, 250, 140, 251].includes(format.itag)) // NetaseMusic PC client do not support webm format
		// .sort((a, b) => b.bitrate - a.bitrate)[0]
		
		let target = querystring.parse(stream.cipher)
		return stream.url || (target.sp.includes('sig') ? cache(signature, null, 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url)
	})
}

const check = info => {
	const searchFunc = key ? search : searchWithoutKey
	return cache(searchFunc, info).then(track)
}

module.exports = {check, track}