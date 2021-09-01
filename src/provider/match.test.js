const { PROVIDERS, DEFAULT_SOURCE } = require('../consts');
const match = require('./match');

const songList = [
	520521849, // Remix; https://music.163.com/song/520521849
	185811, // 周杰倫; https://music.163.com/song/185811
	33955999, // ACG; https://music.163.com/song/33955999
	515540639, // TheFatRat; https://music.163.com/song/515540639
	33190502, // ACG; http://music.163.com/song/33190502
];
const sources = Object.keys(PROVIDERS);

/**
 * Check if the specified song existed in the specified source.
 * @param source {string}
 * @param song {number}
 * @return {Promise<void>}
 */
const isSongExistedInSource = async (source, song) => {
	const response = await match(song, [source]);
	if (!response || !response.url)
		throw new Error(`${song} is not in ${source}`);
};

beforeAll(() => {
	// Disable the cache feature.
	process.env.NO_CACHE = 'true';
});

test('Test if the default sources can get any song', async () => {
	const command = Promise.any(
		songList.map(async (song) => match(song, DEFAULT_SOURCE))
	);

	return expect(command).rejects.not.toThrow();
}, 15000); // can wait for only 15s

sources.forEach((source) => {
	test(`Test if ${source} can get any song`, async () => {
		const command = Promise.any(
			songList.map(async (song) => isSongExistedInSource(source, song))
		);

		return expect(command).rejects.not.toThrow();
	}, 30000); // can wait for 30s
});
