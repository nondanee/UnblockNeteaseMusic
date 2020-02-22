module.exports = list => list[0]

module.exports.ENABLE_FLAC = (process.env.ENABLE_FLAC || '').toLowerCase() === 'true'