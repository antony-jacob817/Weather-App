import React, { useState } from "react";
import { Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { useWeather } from "../context/WeatherContext";

interface WeatherMapProps {
  center: [number, number];
  zoom?: number;
}

const LocationMarker: React.FC = () => {
  const { currentLocation, setCurrentLocation } = useWeather();
  const [position, setPosition] = useState<[number, number] | null>(
    currentLocation ? [currentLocation.lat, currentLocation.lon] : null
  );

  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setCurrentLocation({ lat, lon: lng });
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ center, zoom = 10 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 h-full">
      <div className="flex items-center mb-4 sm:mb-6">
        <Map size={20} className="mr-2 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Weather Map
        </h3>
      </div>
      <div className="h-[300px] w-full rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Click anywhere on the map to check weather at that location
      </p>
    </div>
  );
};

export default WeatherMap;
