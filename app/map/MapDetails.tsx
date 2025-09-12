"use client";

import { ReportCard } from "@/components/report-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/user-avatar";
import { categoryLabels, mockReports, statusLabels } from "@/lib/mock-data";
import { getStoredReports } from "@/lib/storage";
import type { Report, ReportCategory, ReportStatus } from "@/lib/types";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Filter,
  MapPin,
  Search,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("../../components/dynamic-map"), {
  ssr: false, // 👈 disabilita SSR per Leaflet
});

export default function MapDetails({ name }: { name?: string }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filters, setFilters] = useState({
    category: "all" as ReportCategory | "all",
    status: "all" as ReportStatus | "all",
    search: "",
  });

  useEffect(() => {
    // Load reports from storage and merge with mock data
    const storedReports = getStoredReports();
    const allReports = [...mockReports, ...storedReports];
    setReports(allReports);
    setFilteredReports(allReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (report) => report.category === filters.category
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((report) => report.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchLower) ||
          report.description.toLowerCase().includes(searchLower) ||
          report.location.address.toLowerCase().includes(searchLower)
      );
    }

    setFilteredReports(filtered);
  }, [reports, filters]);

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Mappa delle Segnalazioni
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/report">
                <Button>Nuova Segnalazione</Button>
              </Link>
              <UserAvatar name={name} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r overflow-y-auto">
          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtri
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cerca segnalazioni..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="pl-10"
                />
              </div>

              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    category: value as ReportCategory | "all",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tutte le categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le categorie</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value as ReportStatus | "all",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tutti gli stati" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {filteredReports.length} segnalazioni trovate
            </div>
          </div>

          {/* Reports List */}
          <div className="p-4 space-y-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedReport?.id === report.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {report.title}
                    </CardTitle>
                    <Badge
                      className={`text-xs ${getPriorityColor(
                        report.priority
                      )} hover:${getPriorityColor(report.priority)}`}
                    >
                      {report.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${getStatusColor(
                        report.status
                      )} hover:${getStatusColor(report.status)}`}
                    >
                      {statusLabels[report.status]}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {categoryLabels[report.category]}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">
                        {report.location.address}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {report.submittedAt.toLocaleDateString("it-IT")}
                      </span>
                    </div>
                    {report.submittedBy && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>Utente registrato</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p>Nessuna segnalazione trovata</p>
                <p className="text-sm">
                  Prova a modificare i filtri di ricerca
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {/* <MapView
            reports={filteredReports}
            selectedReport={selectedReport}
            onReportSelect={setSelectedReport}
          /> */}
          <Map />

          {/* Selected Report Details */}
          {selectedReport && (
            <div className="absolute top-4 right-4 w-80">
              <ReportCard
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
