interface IpProps{
    ipData: {
        as?: {
            asn: number,
            domain: string,
            name: string,
            route: string,
            type: string,
        },
        ip: string,
        isp: string,
        location: {
            city: string,
            country: string,
            lat: number,
            lng: number,
            region: string,
            timezone: string,
        }
    } | null
};

export type { IpProps };