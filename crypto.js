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

function decryptEapi(cipherText) {
	return decrypt(cipherText, eapiKey)
}
function encryptEapi(cipherText) {
	return encrypt(cipherText, eapiKey)
}
function decryptLinuxapi(cipherText) {
	return decrypt(cipherText, linuxapiKey)
}
function encryptLinuxapi(cipherText) {
	return encrypt(cipherText, linuxapiKey)
}

module.exports = {
	decryptEapi: decryptEapi,
	encryptEapi: encryptEapi,
	decryptLinuxapi: decryptLinuxapi,
	encryptLinuxapi: encryptLinuxapi
}