const devMessage = require('./message');

/**
 * Start the main part.
 *
 * @param {string} mainEntry
 */
function startApp(mainEntry) {
	if (process.env.DEVELOPMENT === 'true') {
		console.warn(devMessage);
		require('../' + mainEntry);
	} else require('../' + mainEntry);
}

module.exports = startApp;
