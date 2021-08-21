/**
 * Does the hostname of `URL` equal `host`?
 *
 * @param url {string}
 * @param host {string}
 * @return {boolean}
 */
const isHost = (url, host) => {
    try {
        return new URL(url).hostname === host;
    } catch (e) {
        console.warn(`ISHOST > Found malformed URL %s. We use the fallback method.`, url);
        console.warn("ISHOST > Please report this to us.")
        if (e) console.warn(e);

        // NOT SAFE: Just an unsafe fallback method.
        // It is better to never reach this code.
        return url.includes(host);
    }
}

/**
 * The wrapper of `isHost()` to simplify the code.
 *
 * @param url {string}
 * @return {(host: string) => boolean}
 * @see isHost
 */
const isHostWrapper = (url) => (host) => isHost(url, host);

module.exports = {
    isHost,
    isHostWrapper,
};
