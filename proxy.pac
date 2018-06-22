function FindProxyForURL(url, host) {
	if (host == 'music.163.com' || host == 'interface.music.163.com') {
		return 'PROXY 79.137.38.20:80';
	}
	return 'DIRECT';
}
