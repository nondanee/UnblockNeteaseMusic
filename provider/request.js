var zlib = require('zlib')
var http = require('http')
var https = require('https')

function httpRequest(options){
	return new Promise(function (resolve, reject){
		var req = http.request(options, function(res) {
			var body = ''
			if(res.headers['content-encoding'] == 'gzip'){
				var gunzip = zlib.createGunzip()
				res.pipe(gunzip)
				gunzip.on('data', function (data) {
					body += data
				})
				gunzip.on('end', function() {
					resolve(body)
				})
			}
			else{
				res.on('data', function(data) {
					body += data
				})
				res.on('end', function() {
					resolve(body)
				})
			}
		}).on('error', function (e) {
			reject(e)
		})
		req.end()
	})
}

function httpsRequest(options){
	return new Promise(function (resolve, reject){
		var req = https.request(options, function(res) {
			var body = ''
			if(res.headers['content-encoding'] == 'gzip'){
				var gunzip = zlib.createGunzip()
				res.pipe(gunzip)
				gunzip.on('data', function (data) {
					body += data
				})
				gunzip.on('end', function() {
					resolve(body)
				})
			}
			else{
				res.on('data', function(data) {
					body += data
				})
				res.on('end', function() {
					resolve(body)
				})
			}
		}).on('error', function (e) {
			reject(e)
		})
		req.end()
	})
}

module.exports = {
	httpRequest: httpRequest, 
	httpsRequest: httpsRequest
}