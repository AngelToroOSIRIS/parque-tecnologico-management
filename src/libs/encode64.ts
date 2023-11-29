const encode64 = (value: string | null | undefined) => {
	if (value === null || value === undefined) return "";

	return btoa(
		encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, p1) {
			//@ts-ignore
			return String.fromCharCode("0x" + p1);
		})
	);
};

export const decode64 = (value: string) => {
	try {
		return atob(value);
	} catch {
		return false;
	}
};

export default encode64;