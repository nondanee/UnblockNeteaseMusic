const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const track = (info) => {
	const url =
		'http://mos9527.tooo.top/ncm/pyncm/track/GetTrackAudio?song_ids=' +
		info.id +
		'&bitrate=' +
		['999000', '320000'].slice(
			select.ENABLE_FLAC ? 0 : 1,
			select.ENABLE_FLAC ? 1 : 2
		);
	return request('GET', url)
		.then((response) => response.body())
		.then((body) => {
			// response.body() without raw should
			// transform the response to string.
			if (typeof body !== 'string')
				return Promise.reject(
					'response.body() returns a value whose type is not string.'
				);

			const jsonBody = JSON.parse(body);
			const matched = jsonBody.data.find((song) => song.id === info.id);
			if (matched) return matched.url;

			return Promise.reject();
		});
};

const cs = getManagedCacheStorage('provider/pyncmd');
const check = (info) => cs.cache(info, () => track(info));

module.exports = { check };
