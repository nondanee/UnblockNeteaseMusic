const cache = require('../cache')
const request = require('../request')
const querystring = require('querystring')

// const proxy = require('url').parse('http://127.0.0.1:1080')
const proxy = undefined
const key = 'YOUR_API_KEY'

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

const search = info => {
    let url =
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(info.keyword)}&type=video&key=${key}`

    return request('GET', url, {accept: 'application/json'}, null, proxy)
    .then(response => response.json())
    .then(jsonBody => {
        let matched = jsonBody.items[0]
        if(matched)
			return matched.id.videoId
		else
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
        return target.sp.includes('sig') ? cache(signature, null, 24 * 60 * 60 * 1000).then(sign => target.url + '&sig=' + sign(target.s)) : target.url
    })
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}