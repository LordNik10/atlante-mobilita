"use client";

import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapClickHandler from "./map-handler";
import { ReportModal } from "./report-modal";

export default function DynamicMap() {
  const [clickedPosition, setClickedPosition] = useState<
    [number, number] | null
  >(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  console.log({ clickedPosition });

  const handleMapClick = (coords: [number, number]) => {
    console.log({ coords });

    setClickedPosition(coords);
    setIsReportModalOpen(true);
  };

  const center: LatLngLiteral = {
    lat: 43.723,
    lng: 10.3966,
  };

  return (
    <>
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
          [43.611392, 10.320325], // Southwest corner
          [43.779567, 10.515504], // Northeast corner
        ]}
        maxBoundsViscosity={1.0}
        minZoom={14}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=poOezaITKOPAT0LhPRP7"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setClickedPosition(null);
        }}
        initialLocation={{
          lat: clickedPosition ? clickedPosition[0] : 0,
          lng: clickedPosition ? clickedPosition[1] : 0,
        }}
        onReportSubmitted={() => {}}
      />
    </>
  );
}
