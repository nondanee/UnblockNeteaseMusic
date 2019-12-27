// Thanks to https://github.com/buschtoens/sni

module.exports = data => {
	let end = data.length
	let pointer = 5 + 1 + 3 + 2 + 32
	const nan = (number = pointer) => isNaN(number)

	if(pointer + 1 > end || nan()) return null
	pointer += 1 + data[pointer]

	if(pointer + 2 > end || nan()) return null
	pointer += 2 + data.readInt16BE(pointer)

	if(pointer + 1 > end || nan()) return null
	pointer += 1 + data[pointer]

	if(pointer + 2 > end || nan()) return null
	let extensionsLength = data.readInt16BE(pointer)
	pointer += 2
	let extensionsEnd = pointer + extensionsLength

	if(extensionsEnd > end || nan(extensionsEnd)) return null
	end = extensionsEnd

	while(pointer + 4 <= end || nan()){
		let extensionType = data.readInt16BE(pointer)
		let extensionSize = data.readInt16BE(pointer + 2)
		pointer += 4
		if(extensionType !== 0){
			pointer += extensionSize
			continue
		}
		if(pointer + 2 > end || nan()) return null
		let nameListLength = data.readInt16BE(pointer)
		pointer += 2
		if(pointer + nameListLength > end) return null

		while(pointer + 3 <= end || nan()){
			let nameType = data[pointer]
			let nameLength = data.readInt16BE(pointer + 1)
			pointer += 3
			if(nameType !== 0){
				pointer += nameLength
				continue
			}
			if(pointer + nameLength > end || nan()) return null
			return data.toString('ascii', pointer, pointer + nameLength)
		}
	}

	return null
}