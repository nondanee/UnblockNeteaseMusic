const info = require('./info.js')
const qq = require('./qq.js')
const xiami = require('./xiami.js')
const kugou = require('./kugou.js')
const kuwo = require('./kuwo.js')

function search(id,proxy){
	return new Promise(function (resolve, reject){
		info(id)
		.then(function (keyword) {
			var qqResult = qq.check(keyword)
			var xiamiResult = xiami.check(keyword)
			// var kugouResult = kugou.check(keyword)
			// var kuwoResult = kuwo.check(keyword)
			// Promise.all([qqResult, xiamiResult, kugouResult, kuwoResult])
			Promise.all([qqResult, xiamiResult])
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