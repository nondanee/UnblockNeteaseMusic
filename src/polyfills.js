/**
 * Polyfills
 */

/**
 * The polyfill of Promise.any.
 *
 * commit   e1e75a1410490906d2da1bda0d4aafb1788f2195
 * file     index.js
 *
 * Thanks to https://github.com/ungap/promise-any
 */
Promise.any = (Promise.any || function ($) {
	return new Promise(function (D, E, A, L) {
		A = [];
		L = $.map(function ($, i) {
			return Promise.resolve($).then(D, function (O) {
				return ((A[i] = O), --L) || E({ errors: A });
			});
		}).length;
	});
}).bind(Promise);
