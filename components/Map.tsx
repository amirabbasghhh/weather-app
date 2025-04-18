"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Skeleton } from "@heroui/react";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

interface MapProps {
  latitude: number;
  longitude: number;
}

const FlyToLocation = ({ latitude, longitude }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 14, {
        duration: 1.5,
      });
    }
  }, [latitude, longitude]);

  return null;
};

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // فقط سمت کلاینت اجرا بشه

    return () => {
      // 🧹 پاک‌سازی کامل DOM برای جلوگیری از خطای Leaflet
      if (mapWrapperRef.current) {
        mapWrapperRef.current.innerHTML = "";
      }
    };
  }, []);

  if (!latitude || !longitude || !isClient) {
    return <Skeleton className="w-full h-60 rounded-lg" />;
  }

  const position: LatLngExpression = [latitude, longitude];

  return (
    <div
      ref={mapWrapperRef}
      style={{ height: "50vh", width: "100%", borderRadius: "20px", overflow: "hidden" }}
    >
      <MapContainer
        center={position}
        key={`${latitude}-${longitude}`}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Your location</Popup>
        </Marker>
        <FlyToLocation latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
};

export default Map;
