"use client";

import { HubCard } from "@/components/hub-card";
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
import { priorityLabels } from "@/lib/mock-data";
import type { Priority, Report } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";
import dayjs from "dayjs";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Filter,
  Search,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../public/pinmov-logo.png";
import { user } from "../sever-actions/user/getUserInfo";
import { Hub, useHubs } from "./useHubs";
import { useReports } from "./useReports";
import useWindowSize from "./useWindowSize";

const Map = dynamic(() => import("../../components/dynamic-map"), {
  ssr: false, // 👈 disabilita SSR per Leaflet
});

export default function MapDetails({ user }: { user: user | null }) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [filters, setFilters] = useState({
    severity: "all" as Priority | "all",
    search: "",
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { width } = useWindowSize();

  const isMobile = width !== undefined && width < 768;

  const {
    reports,
    filteredReports,
    getReports,
    setFilteredReports,
    isLoading: isLoadingReports,
  } = useReports();

  const { hubs, getHubs, isLoading: isLoadingHubs } = useHubs();

  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getHubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (filters.severity !== "all") {
      filtered = filtered.filter(
        (report) => report.severity === filters.severity
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchLower) ||
          report.description?.toLowerCase().includes(searchLower) ||
          report.lat.toString().includes(searchLower) ||
          report.lng.toString().includes(searchLower)
      );
    }

    setFilteredReports(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports, filters]);

  if (isLoadingReports || isLoadingHubs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-500">Caricamento mappa...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              <div className="flex items-center gap-3">
                <Image src={logo} alt="Logo" className="w-24 h-24 text-white" />
                <h1 className="text-xl font-bold text-gray-900">
                  Mappa delle Segnalazioni
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <UserAvatar name={user?.name} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {!isFiltersOpen && (
          <Button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            variant="ghost"
            size="sm"
          >
            <Filter className="w-4 h-4" />
            Filtri
          </Button>
        )}
        {isFiltersOpen && (
          <div className="w-96 bg-white border-r overflow-y-auto">
            {/* Filters */}
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  variant="ghost"
                  size="sm"
                >
                  <Filter className="w-4 h-4" />
                  Filtri
                </Button>
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cerca segnalazioni..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="pl-10"
                  />
                </div>

                <Select
                  value={filters.severity}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      severity: value as Priority | "all",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tutte le priorità" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le priorità</SelectItem>
                    {Object.entries(priorityLabels).map(([key, label]) => (
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
              <p>Hub</p>
              {hubs.map((hub) => (
                <Card
                  key={hub.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedHub?.id === hub.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedHub(hub);
                    setSelectedReport(null);
                    setIsFiltersOpen(isMobile ? false : isFiltersOpen);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {hub.name}
                      </CardTitle>
                      <Badge>{hub.services}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              <p>Segnalazioni</p>
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedReport?.id === report.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedReport(report);
                    setSelectedHub(null);
                    setIsFiltersOpen(isMobile ? false : isFiltersOpen);
                  }}
                >
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
        )}

        {/* Map */}
        <div className="flex-1 relative">
          <Map
            reports={filteredReports}
            selectedReport={selectedReport}
            selectedHub={selectedHub}
            getReports={getReports}
            hubs={hubs}
            user={user}
          />
          {selectedReport && (
            <div className="absolute z-2000 top-4 right-4 w-80">
              <ReportCard
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
              />
            </div>
          )}
          {selectedHub && (
            <div className="absolute z-2000 top-4 right-4 w-80">
              <HubCard hub={selectedHub} onClose={() => setSelectedHub(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
