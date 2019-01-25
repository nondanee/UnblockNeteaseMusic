const cache = require('../cache')
const request = require('../request')

const find = id => {
	let url =
		'https://music.163.com/api/song/detail?ids=[' + id + ']'

	return request('GET', url)
	.then(response => response.json())
	.then(jsonBody => {
		let info = jsonBody['songs'][0]
		info.keyword = info.name + ' - ' + info.artists[0].name
		return info
	})
}

module.exports = id => cache(find, id)