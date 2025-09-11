"use client";

import { useGeoLocation } from "@/app/map/useGeoLocation";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function DynamicMap() {
  const { location } = useGeoLocation();
  console.log({ location });

  const center: LatLngLiteral = {
    lat: 43.723,
    lng: 10.3966,
  };

  return (
    <MapContainer
      key={`${center.lat}-${center.lng}`}
      center={center}
      zoom={16}
      style={{
        width: "100%",
        height: "100%",
      }}
      worldCopyJump={false}
      maxBounds={[
        [-85, -150], // Southwest corner
        [85, 180], // Northeast corner
      ]}
      maxBoundsViscosity={1.0}
      minZoom={14}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=poOezaITKOPAT0LhPRP7"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
    </MapContainer>
  );
}
