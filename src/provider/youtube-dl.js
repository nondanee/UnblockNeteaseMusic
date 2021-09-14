const execa = require('execa');
const { getManagedCacheStorage } = require('../cache');
const { CheckIfExist } = require('cmdexist');
const { logScope } = require('../logger');
const YoutubeDlInvalidResponse = require('../exceptions/YoutubeDlInvalidResponse');
const YoutubeDlNotInstalled = require('../exceptions/YoutubeDlNotInstalled');

/**
 * The arguments to pass to youtube-dl
 *
 * ```plain
 * youtube-dl -f bestaudio --dump-json <query>
 *		-f bestaudio 	choose the best quality of the audio
 *		--dump-json		dump the information as JSON without downloading it
 * ```
 *
 * @param {string} query
 */
const dlArguments = (query) => ['-f', '140', '--dump-json', query];
/** @param {string} id */
const byId = (id) => `https://www.youtube.com/watch?v=${id}`;
/** @param {string} keyword */
const byKeyword = (keyword) => `ytsearch1:${keyword}`;
const logger = logScope('provider/youtube-dl');

/**
 * Is `youtube-dl` installed?
 * @return {Promise<boolean>}
 */
async function youtubeDlInstalled() {
	const existence = await CheckIfExist('youtube-dl');

	if (!existence)
		logger.error(
			"youtube-dl was not installed! The source `youtube-dl` won't be used."
		);

	return existence;
}

/**
 * Checking if youtube-dl is available,
 * then execute the command and extract the ID and URL.
 *
 * @param {string[]} args
 * @returns {Promise<{id: string, url: string}>}
 */
async function getUrl(args) {
	if (!(await youtubeDlInstalled())) {
		throw new YoutubeDlNotInstalled();
	}

	const { stdout } = await execa('youtube-dl', args);
	const response = JSON.parse(stdout);
	if (
		typeof response === 'object' &&
		typeof response.id === 'string' &&
		typeof response.url === 'string'
	)
		return response;

	throw new YoutubeDlInvalidResponse(response);
}

const search = async (info) => {
	const { id } = await getUrl(dlArguments(byKeyword(info.keyword)));
	return id;
};

const track = async (id) => {
	const { url } = await getUrl(dlArguments(byId(id)));
	return url;
};

const cs = getManagedCacheStorage('youtube-dl');
const check = (info) =>
	cs
		.cache(info, () => search(info))
		.then(track)
		.catch((e) => {
			if (e) logger.error(e);
			throw e;
		});

module.exports = { check, track };
