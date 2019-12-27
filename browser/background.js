import match from './provider/match.js'
const self = chrome.runtime.id

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
	match(request.match, ['qq'])
	.then(song => sendResponse(song))
	.catch(console.log)
	return true
})

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
	let headers = details.requestHeaders
	if(details.url.includes('//music.163.com/')){
		headers.push({name: 'X-Real-IP', value: '118.88.88.88'})
	}
	if(details.initiator == `chrome-extension://${self}`){
		let index = headers.findIndex(item => item.name.toLowerCase() === 'additional-headers')
		if(index === -1) return
		Object.entries(JSON.parse(atob(headers[index].value))).forEach(entry => headers.push({name: entry[0], value: entry[1]}))
		headers.splice(index, 1)
	}
	if(details.initiator == 'https://music.163.com' && (details.type == 'media' || details.url.includes('.mp3'))){
		headers = headers.filter(item => !['referer', 'origin'].includes(item.name.toLowerCase()))
	}
	return {requestHeaders: headers}
}, {urls: ['*://*/*']}, ['blocking', 'requestHeaders', 'extraHeaders'])

chrome.webRequest.onHeadersReceived.addListener(details => {
	let headers = details.responseHeaders
	if(details.initiator == 'https://music.163.com' && (details.type == 'media' || details.url.includes('.mp3'))){
		headers.push({name: 'Access-Control-Allow-Origin', value: '*'})
	}
	return {responseHeaders: headers}
}, {urls: ['*://*/*']}, ['blocking', 'responseHeaders'])