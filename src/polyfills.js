/**
 * Polyfills
 */

/**
 * The polyfill of Promise.any.
 *
 * commit   e1e75a1410490906d2da1bda0d4aafb1788f2195
 * file     min.js
 *
 * Thanks to https://github.com/ungap/promise-any
 */


Promise.any = (Promise.any || function (n) {
	return new Promise(function (e, o, i, t) {
		i = [], t = n.map(function (n, r) {
			return Promise.resolve(n).then(e, function (n) {
				return i[r] = n, --t || o({
					errors: i
				})
			})
		}).length
	})
}).bind(Promise);
