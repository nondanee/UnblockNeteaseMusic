const info = require('./info.js')
const qq = require('./qq.js')
const xiami = require('./xiami.js')
const baidu = require('./baidu.js')
const kugou = require('./kugou.js')
const kuwo = require('./kuwo.js')
const migu = require('./migu.js')
const provider = [qq, xiami, baidu]

function search(id){
	return new Promise(function(resolve, reject){
		var meta, urls
		info(id)
		.then(function(songInfo){
			meta = songInfo
			return Promise.all(provider.map(function(source){
				return source.check(songInfo)
			}))
		})
		.then(function(results){
			urls = results.filter(function(url){return url})
			if(urls.length > 0){
				var url = urls[0]
				console.log(`[${meta.id}] ${meta.name}\n${url}`)
				resolve(url)
			}
			else{
				reject()
			}
		})
		.catch(function(e){
			reject()
		})
	})
}

module.exports = search