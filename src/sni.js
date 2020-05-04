/* Thanks to
	https://github.com/buschtoens/sni
	https://github.com/jessetane/is-tls-client-hello
*/

const contain = data => {
	const headerSize = 5
	if (data.length < headerSize) return false

	if (data[0] !== 22) return false

	const majorVersion = data[1]
	const minorVersion = data[2]
	if (majorVersion !== 3) return false
	if (minorVersion < 1 || minorVersion > 3) return false

	const length = data[3] << 8 | data[4]
	if (data.length < headerSize + length) return false

	if (data[5] !== 1) return false

	return true
}

const extract = data => {
	let end = data.length
	let pointer = 5 + 1 + 3 + 2 + 32
	const nan = (number = pointer) => isNaN(number)

	if (pointer + 1 > end || nan()) return null
	pointer += 1 + data[pointer]

	if (pointer + 2 > end || nan()) return null
	pointer += 2 + data.readInt16BE(pointer)

	if (pointer + 1 > end || nan()) return null
	pointer += 1 + data[pointer]

	if (pointer + 2 > end || nan()) return null
	const extensionsLength = data.readInt16BE(pointer)
	pointer += 2
	const extensionsEnd = pointer + extensionsLength

	if (extensionsEnd > end || nan(extensionsEnd)) return null
	end = extensionsEnd

	while (pointer + 4 <= end || nan()) {
		const extensionType = data.readInt16BE(pointer)
		const extensionSize = data.readInt16BE(pointer + 2)
		pointer += 4
		if (extensionType !== 0) {
			pointer += extensionSize
			continue
		}
		if (pointer + 2 > end || nan()) return null
		const nameListLength = data.readInt16BE(pointer)
		pointer += 2
		if (pointer + nameListLength > end) return null

		while (pointer + 3 <= end || nan()) {
			const nameType = data[pointer]
			const nameLength = data.readInt16BE(pointer + 1)
			pointer += 3
			if (nameType !== 0) {
				pointer += nameLength
				continue
			}
			if (pointer + nameLength > end || nan()) return null
			return data.toString('ascii', pointer, pointer + nameLength)
		}
	}

	return null
}

module.exports = {contain, extract}