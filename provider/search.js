const info = require('./info.js')
const qq = require('./qq.js')
const xiami = require('./xiami.js')
const baidu = require('./baidu.js')
const kugou = require('./kugou.js')
const kuwo = require('./kuwo.js')
const migu = require('./migu.js')

function search(id,proxy){
	return new Promise(function (resolve, reject){
		info(id)
		.then(function (keyword) {
			var sources = [qq, xiami, baidu].map(function(platform){
				return platform.check(keyword)
			})
			Promise.all(sources)
			.then(function (results){
				var urls = results.filter(function(url){return url})
				if(urls.length > 0){
					console.log('[Replace]',urls[0])
					resolve(urls[0])
				}
				else
					reject()
			})
		})
		.catch(function () {
			reject()
		})
	})
}

module.exports = search