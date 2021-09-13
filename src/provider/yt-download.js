const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

// const proxy = require('url').parse('http://127.0.0.1:1080')
const proxy = undefined;
const key = process.env.YOUTUBE_KEY || null; // YouTube Data API v3

const apiSearch = (info) => {
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
		info.keyword
	)}&type=video&key=${key}`;

	return request('GET', url, { accept: 'application/json' }, null, proxy)
		.then((response) => response.json())
		.then((jsonBody) => {
			const matched = jsonBody.items[0];
			if (matched) return matched.id.videoId;
			else return Promise.reject();
		});
};

const search = (info) => {
	const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
		info.keyword
	)}`;

	return request('GET', url, {}, null, proxy)
		.then((response) => response.body())
		.then((body) => {
			const initialData = JSON.parse(
				body.match(/ytInitialData\s*=\s*([^;]+);/)[1]
			);
			const matched =
				initialData.contents.twoColumnSearchResultsRenderer
					.primaryContents.sectionListRenderer.contents[0]
					.itemSectionRenderer.contents[0];
			if (matched) return matched.videoRenderer.videoId;
			else return Promise.reject();
		});
};

const track = (id) => {
	const url = `https://www.yt-download.org/api/button/mp3/${id}`;
	const regex = /<a[^>]*href=["']([^"']*)["']/;

	return request('GET', url, {}, null, proxy)
		.then((response) => response.body())
		.then((body) => {
			var matched = body.match(regex);
			return matched ? matched[1] : Promise.reject();
		});
};

const cs = getManagedCacheStorage('provider/yt-download');
const check = (info) =>
	cs
		.cache(info, () => {
			if (key) return apiSearch(info);
			return search(info);
		})
		.then(track);

module.exports = { check, track };
