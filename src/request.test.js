const { CancelRequest } = require('./cancel');
const request = require('./request');
const RequestCancelled = require('./exceptions/RequestCancelled');

describe('request()', () => {
	test('will throw RequestCancelled when the CancelRequest has been cancelled', async () => {
		const cancelRequest = new CancelRequest();
		cancelRequest.cancel();

		try {
			await request(
				'GET',
				'https://www.example.com',
				undefined,
				undefined,
				undefined,
				cancelRequest
			);
		} catch (e) {
			console.log(e);
			expect(e).toBeInstanceOf(RequestCancelled);
			return;
		}

		throw new Error('It should not be fulfilled.');
	});

	test('will NOT throw RequestCancelled when the CancelRequest has not been cancelled', async () => {
		const cancelRequest = new CancelRequest();

		return request(
			'GET',
			'https://www.example.com',
			undefined,
			undefined,
			undefined,
			cancelRequest
		);
	}, 15000);
});
