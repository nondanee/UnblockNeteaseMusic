'use strict'

const crypto = require('crypto')
const eapiKey = 'e82ckenh8dichen8'
const linuxapiKey = 'rFgB&h#%2?^eDg:Q'

function decrypt(cipherText, key) {
	const decipher = crypto.createDecipheriv('aes-128-ecb',key,'')
	let text = decipher.update(cipherText,'hex','utf8')
	text += decipher.final('utf8')
	return text
}

function encrypt(text, key) {
	const cipher = crypto.createCipheriv('aes-128-ecb',key,'')
	let cipherText = cipher.update(text,'utf8','hex')
	cipherText += cipher.final('hex')
	return cipherText
}

module.exports = {
	eapi:{
		encrypt: function(text){
			return encrypt(text, eapiKey)
		},
		decrypt: function(cipherText){
			return decrypt(cipherText, eapiKey)
		}
	},
	linuxapi:{
		encrypt: function(text){
			return encrypt(text, linuxapiKey)
		},
		decrypt: function(cipherText){
			return decrypt(cipherText, linuxapiKey)
		}
	}
}