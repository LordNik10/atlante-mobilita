"use client";

import { useRef } from "react";
import type { Report } from "@/lib/types";
import { MapPin } from "lucide-react";

interface MapViewProps {
  reports: Report[];
  selectedReport: Report | null;
  onReportSelect: (report: Report) => void;
}

export function MapView({
  reports,
  selectedReport,
  onReportSelect,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const getMarkerColor = (report: Report) => {
    switch (report.status) {
      case "submitted":
        return "bg-blue-500";
      case "under-review":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-orange-500";
      case "resolved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPrioritySize = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "w-6 h-6";
      case "high":
        return "w-5 h-5";
      case "medium":
        return "w-4 h-4";
      case "low":
        return "w-3 h-3";
      default:
        return "w-4 h-4";
    }
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-full bg-gray-100 relative overflow-hidden"
    >
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Street names */}
        <div className="absolute top-20 left-20 text-gray-600 font-medium">
          Via Roma
        </div>
        <div className="absolute top-40 right-32 text-gray-600 font-medium">
          Corso Buenos Aires
        </div>
        <div className="absolute bottom-32 left-40 text-gray-600 font-medium">
          Piazza Duomo
        </div>
      </div>

      {/* Report Markers */}
      {reports.map((report, index) => {
        const isSelected = selectedReport?.id === report.id;
        // Simulate positioning based on coordinates
        const x = (((report.location.lng - 9.18) * 2000) % 80) + 10;
        const y = (((45.47 - report.location.lat) * 2000) % 80) + 10;

        return (
          <div
            key={report.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
              isSelected ? "scale-125 z-20" : "z-10"
            }`}
            style={{
              left: `${Math.max(5, Math.min(95, x + (index % 3) * 10))}%`,
              top: `${Math.max(5, Math.min(95, y + (index % 4) * 8))}%`,
            }}
            onClick={() => onReportSelect(report)}
          >
            <div
              className={`${getMarkerColor(report)} ${getPrioritySize(
                report.priority
              )} rounded-full flex items-center justify-center shadow-lg ${
                isSelected ? "ring-4 ring-white ring-opacity-50" : ""
              }`}
            >
              <MapPin className="w-3 h-3 text-white" />
            </div>
            {isSelected && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {report.title}
              </div>
            )}
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-2">
        <div className="text-xs font-medium mb-2">Legenda</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Inviata</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>In valutazione</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>In corso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Risolta</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg">
        <button className="block w-10 h-10 flex items-center justify-center border-b hover:bg-gray-50">
          +
        </button>
        <button className="block w-10 h-10 flex items-center justify-center hover:bg-gray-50">
          −
        </button>
      </div>
    </div>
  );
}
