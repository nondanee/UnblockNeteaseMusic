
const bodyify = object => Object.entries(object).map(entry => entry.map(encodeURIComponent).join('=')).join('&')

const toBuffer = string => (new TextEncoder()).encode(string)
const toHex = arrayBuffer => Array.from(arrayBuffer).map(n => n.toString(16).padStart(2, '0')).join('')
const toBase64 = arrayBuffer => btoa(arrayBuffer)

export default {
	uri: {
		retrieve: id => {
			id = id.toString().trim()
			const key = '3go8&$8*3*3h0k(2)2'
			let string = Array.from(Array(id.length).keys()).map(index => String.fromCharCode(id.charCodeAt(index) ^ key.charCodeAt(index % key.length))).join('')
			let result = CryptoJS.MD5(string).toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-')
			return `http://p1.music.126.net/${result}/${id}`
		}
	},
	md5: {
		digest: value => CryptoJS.MD5(value).toString()
	},
	miguapi: {
		encrypt: object => {
			let text = JSON.stringify(object), signer = new JSEncrypt()
			let password = Array.from(window.crypto.getRandomValues(new Uint8Array(32))).map(n => n.toString(16).padStart(2, '0')).join('')
			signer.setPublicKey('-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----')
			return bodyify({
				data: CryptoJS.AES.encrypt(text, password).toString(),
				secKey: signer.encrypt(password)
			})
		}
	}
}