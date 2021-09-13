const devMessage = require('./message');

/**
 * Start the main part.
 *
 * @param {string} mainEntry
 */
function startApp(mainEntry) {
	if (process.env.DEVELOPMENT === 'true') {
		console.warn(devMessage);
		// Require the source.
		require('../' + mainEntry);
	} else {
		// Require the precompiled bundle.
		require('../../precompiled/' + mainEntry);
	}
}

module.exports = startApp;
