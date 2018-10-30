const request = require('../request.js')

const search = info => {
	let url =
		'http://m.10086.cn/migu/remoting/scr_search_tag?' + 
		'keyword=' + encodeURIComponent(info.keyword) + '&type=2&rows=20&pgc=1'

	return request('GET', url)
	.then(response => {
		let jsonBody = JSON.parse(response.body)
		if('musics' in jsonBody){
			let chief = jsonBody['musics'][0]
			return chief.mp3
		}
		else{
			return Promise.reject()
		}
	})
}

const check = info => search(info).catch(e => {})

module.exports = {check}