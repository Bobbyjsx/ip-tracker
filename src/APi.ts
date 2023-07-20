const url =
	"https://geo.ipify.org/api/v2/country,city?apiKey=at_XLrx30ZvPubh0CoxHc2AXpQC4ipor&ipAddress=";

export const fetchIp = async (ip: string) => {
	const resp = await fetch(`${url}${ip}`);
	const data = await resp.json();
	return data;
};

export const fetchUserIp = async () => {
	const resp = await fetch("https://api.ipify.org/?format=json");
	const data = await resp.json();
	return data;
};
