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