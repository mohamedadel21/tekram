export const urlSecurity = (url: string) => {
	if (url.startsWith('http:')) {
		return url.split(':')[0].concat('s:').concat(url.split(':')[1]);
	} else {
		return url;
	}
};
