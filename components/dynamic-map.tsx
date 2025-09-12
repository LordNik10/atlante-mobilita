"use client";

import { Report } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";
import dayjs from "dayjs";
import L, { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge, Calendar, User } from "lucide-react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "../assets/marker-icon.png";
import MapClickHandler from "./map-handler";
import { ReportModal } from "./report-modal";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover } from "./ui/popover";

const markerIcon = L.icon({
  iconUrl: markerIconPng.src,

  iconSize: [30, 45], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [15, 48], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export default function DynamicMap({
  reports,
  selectedReportId,
  getReports,
}: {
  reports: Report[];
  selectedReportId?: string | null;
  getReports: () => void;
}) {
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
        {reports.map((report) => (
          <Marker
            position={{ lat: report.lat, lng: report.lng }}
            key={report?.id}
            icon={markerIcon}
          >
            <Popover
              open={selectedReportId === report.id}
              onOpenChange={() => {}}
            >
              <Popup>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {report.title}
                    </CardTitle>
                    <Badge
                      className={`text-xs ${getPriorityColor(
                        report.severity
                      )} hover:${getPriorityColor(report.severity)}`}
                    >
                      {report.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {dayjs(report.created_at).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    {report.name && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{report.name}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Popup>
            </Popover>
          </Marker>
        ))}
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
        getReports={getReports}
      />
    </>
  );
}
