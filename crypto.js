'use strict'

const crypto = require('crypto')
const eapiKey = 'e82ckenh8dichen8'
const linuxapiKey = 'rFgB&h#%2?^eDg:Q'

function decrypt(cipherBuffer, key) {
	var decipher = crypto.createDecipheriv('aes-128-ecb',key,'')
	return Buffer.concat([decipher.update(cipherBuffer),decipher.final()])
}

function encrypt(plainBuffer, key) {
	var cipher = crypto.createCipheriv('aes-128-ecb',key,'')
	return Buffer.concat([cipher.update(plainBuffer),cipher.final()])
}

module.exports = {
	eapi:{
		encrypt: function(buffer){
			return encrypt(buffer, eapiKey)
		},
		decrypt: function(cipherBuffer){
			return decrypt(cipherBuffer, eapiKey)
		},
		encryptRequest: function(url, object){
			var text = JSON.stringify(object)
			var message = `nobody${url}use${text}md5forencrypt`
			var digest = crypto.createHash('md5').update(message).digest('hex')
			var data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
			return encrypt(Buffer.from(data), eapiKey).toString('hex').toUpperCase()
		}
	},
	linuxapi:{
		encrypt: function(buffer){
			return encrypt(buffer, linuxapiKey)
		},
		decrypt: function(cipherBuffer){
			return decrypt(cipherBuffer, linuxapiKey)
		},
		encryptRequest: function(object){
			var text = JSON.stringify(object)
			return encrypt(Buffer.from(text), linuxapiKey).toString('hex').toUpperCase()
		}
	},
	 base64: {
		encode: function(text){
			return Buffer.from(text).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
		},
		decode: function(text){
			return Buffer.from(text.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('ascii')
		}
	}
}