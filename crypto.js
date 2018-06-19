'use strict'

const crypto = require('crypto')
const key = 'e82ckenh8dichen8'

function decrypt(cipherText) {
	const decipher = crypto.createDecipheriv('aes-128-ecb',key,'')
	let text = decipher.update(cipherText,'hex','utf8')
	text += decipher.final('utf8')
	return text
}

function encrypt(text){
	const cipher = crypto.createCipheriv('aes-128-ecb',key,'')
	let cipherText = cipher.update(text,'utf8','hex')
	cipherText += cipher.final('hex')
	return cipherText
}

module.exports = {
	Decrypt: decrypt,
	Encrypt: encrypt
}