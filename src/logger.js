const pino = require('pino');

// The destination of the log file. Can be `undefined`.
const destFile = process.env.LOG_FILE;

const logger = pino(
	{
		level: process.env.LOG_LEVEL ?? 'info',
		prettyPrint:
			process.env.JSON_LOG === 'true'
				? false
				: {
						colorize: true,
						messageFormat:
							'\x1b[1m\x1b[32m({scope})\x1b[0m\x1b[36m {msg}',
						ignore: 'time,pid,hostname,scope',
						errorProps: '*',
				  },
	},
	// Redirect the logs to destFile if specified.
	destFile && pino.destination(destFile)
);

/**
 * Add the scope of this log message.
 *
 * @param {string} scope The scope of this log message.
 * @return {pino.Logger}
 */
function logScope(scope) {
	return logger.child({
		scope,
	});
}

module.exports = {
	logger,
	logScope,
};
