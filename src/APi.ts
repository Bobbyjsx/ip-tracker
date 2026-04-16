export const fetchIp = async (ip: string) => {
	// Simple Regex to check if the input is an IP address
	const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
	
	let targetIp = ip;

	// If it's not a valid IP, assume it's a domain and try to resolve it
	if (!ipRegex.test(ip)) {
		try {
			const dnsResp = await fetch(`https://cloudflare-dns.com/dns-query?name=${ip}&type=A`, {
				headers: { 'Accept': 'application/dns-json' }
			});
			const dnsData = await dnsResp.json();
			if (dnsData.Answer && dnsData.Answer.length > 0) {
				// Get the first A record
				targetIp = dnsData.Answer.find((a: any) => a.type === 1)?.data || ip;
			}
		} catch (error) {
			console.error("Domain resolution failed:", error);
		}
	}

	const resp = await fetch(`https://ipapi.co/${targetIp}/json/`);
	const data = await resp.json();
	return data;
};

export const fetchUserIp = async () => {
	const resp = await fetch("https://ipapi.co/json/");
	const data = await resp.json();
	return data;
};
