import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const neonIcon = L.divIcon({
  className: "neon-marker",
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-8 h-8 bg-terminal-accent/20 rounded-full animate-ping"></div>
      <div class="absolute w-4 h-4 bg-terminal-accent rounded-full shadow-[0_0_15px_#00F3FF]"></div>
      <div class="w-2 h-2 bg-white rounded-full relative z-10"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface MapHUDProps {
  location: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

// Component to handle map centering when coordinates change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== undefined && center[1] !== undefined) {
      map.setView(center, 13, {
        animate: true,
      });
    }
  }, [center, map]);
  return null;
}

const MapHUD = ({ location }: MapHUDProps) => {
  // Defensive check for the location data
  const lat = location?.location?.lat;
  const lng = location?.location?.lng;

  if (lat === undefined || lng === undefined) {
    return (
      <div className="w-full h-[60vh] bg-terminal-card/5 flex items-center justify-center border-t border-terminal-accent/20">
        <span className="text-xs uppercase tracking-[0.4em] text-red-500/50">
          Invalid Coordinates
        </span>
      </div>
    );
  }

  const position: [number, number] = [lat, lng];

  return (
    <div className="relative w-full h-[40dvh] sm:h-[60dvh] lg:h-[70dvh] brightness-90">
      {/*
        Using a key here ensures that if the component is mounted twice in the same tick
        (React 19 Strict Mode), Leaflet has a clean slate.
        However, we keep the key stable to allow ChangeView to handle panning.
      */}
      <MapContainer
        key="terminal-map-instance"
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full bg-terminal-bg border-"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="map-tiles-filter"
        />
        <Marker position={position} icon={neonIcon} />
        <ChangeView center={position} />
      </MapContainer>

      {/* Decorative HUD overlay for map */}
      <div className="absolute inset-0 pointer-events-none border-[10px]- border-terminal-bg/50- z-[1000]">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-terminal-accent/80 shadow-[0_0_15px_rgba(0,243,255,0.4)]"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-terminal-accent/80 shadow-[0_0_15px_rgba(0,243,255,0.4)]"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-terminal-accent/80 shadow-[0_0_15px_rgba(0,243,255,0.4)]"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-terminal-accent/80 shadow-[0_0_15px_rgba(0,243,255,0.4)]"></div>

        <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-terminal-accent/50 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.2)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapHUD;
