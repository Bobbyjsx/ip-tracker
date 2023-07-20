import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
	location: {
		location: {
			lat: number;
			lng: number;
		};
	};
}

const Map = ({ location }: MapProps) => {
	const { lat, lng } = location.location;
	const key = "Lk__fvNW6fJUTpOSLGvjNQ";

	useEffect(() => {
		const url = `https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${key}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const map = L.map("map").setView([lat, lng], 13);
				L.tileLayer(
					"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
					{
						attribution:
							"&copy; OpenStreetMap contributors",
						maxZoom: 18,
					}
				).addTo(map);

				L.marker([lat, lng]).addTo(map);
			})

			.catch((error) => console.log(error));
	}, [location, lat, lng]);

	return (
		<div
			id="map"
			className="bg-gray-200 relative z-0 flex"
			style={{ height: "60vh" }}></div>
	);
};

export default Map;
