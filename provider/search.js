const info = require('./info.js')
const qq = require('./qq.js')
const xiami = require('./xiami.js')
const baidu = require('./baidu.js')
const kugou = require('./kugou.js')
const kuwo = require('./kuwo.js')
const migu = require('./migu.js')

function search(id){
	return new Promise(function(resolve, reject){
		info(id)
		.then(function(songInfo){
			return Promise.all([qq, xiami, baidu].map(function(source){
				return source.check(songInfo)
			}))
		})
		.then(function(results){
			var urls = results.filter(function(url){return url})
			if(urls.length > 0){
				console.log('[Replace]',urls[0])
				resolve(urls[0])
			}
			else
				reject()
		})
		.catch(function(e){
			reject()
		})
	})
}

module.exports = search