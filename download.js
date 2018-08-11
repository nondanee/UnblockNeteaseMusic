const fs = require('fs')
const url = require('url')
const ffmpeg = require('fluent-ffmpeg')
const request = require('./request.js')

if(!fs.existsSync('cache')){
	fs.mkdirSync('cache')
}

function download(id, uri){
	return new Promise(function (resolve, reject) {
		var input = `cache/${id}`
		var output = `cache/${id}.mp3`

		var fileStream = fs.createWriteStream(input)
		var urlObj = url.parse(uri)
		var options = request.init('GET', urlObj)
		var makeRequest = request.make(urlObj)

		var req = makeRequest(options, function(res) {
			res.pipe(fileStream)
			res.on('end', function(){
				if(uri.indexOf('.mp3') != -1){
					fs.rename(input, output, function(error){
						if(!error)
							resolve()
						else
							reject()
					})
				}
				else{
					convert(input, output)
					.then(function(){
						fs.unlink(input, function(){})
						resolve()
					})
					.catch(function(){
						reject()
					})
				}
			})
		}).on('error', function (e) {
			reject()
		})
		req.end()
	})
}

function convert(input, output){
	return new Promise(function (resolve, reject) {
		ffmpeg(input).audioCodec('libmp3lame')
		.saveToFile(output)
		.on('error', function(error) {
			reject(error)
		})
		.on('end', function() {
			resolve()
		})
	})
}

module.exports = download