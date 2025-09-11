"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { Report, ReportStatus } from "@/lib/types";
import {
  categoryLabels,
  statusLabels,
  priorityLabels,
  mockReports,
} from "@/lib/mock-data";
import { getStoredReports, updateReport } from "@/lib/storage";

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filters, setFilters] = useState({
    status: "all" as ReportStatus | "all",
    priority: "all",
    search: "",
  });

  useEffect(() => {
    const storedReports = getStoredReports();
    const allReports = [...mockReports, ...storedReports];
    setReports(allReports);
    setFilteredReports(allReports);
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (filters.status !== "all") {
      filtered = filtered.filter((report) => report.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (report) => report.priority === filters.priority
      );
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

  const updateReportStatus = (
    reportId: string,
    status: ReportStatus,
    notes?: string
  ) => {
    const updatedReport = updateReport(reportId, {
      status,
      municipalNotes: notes,
    });
    if (updatedReport) {
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? updatedReport : r))
      );
      setSelectedReport(null);
    }
  };

  // Statistics
  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "submitted").length,
    inProgress: reports.filter((r) => r.status === "in-progress").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  };

  // Chart data
  const categoryData = Object.entries(categoryLabels).map(([key, label]) => ({
    name: label,
    value: reports.filter((r) => r.category === key).length,
  }));

  const statusData = Object.entries(statusLabels).map(([key, label]) => ({
    name: label,
    value: reports.filter((r) => r.status === key).length,
  }));

  const COLORS = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Dashboard Comunale
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/map">
                <Button variant="ghost">Mappa</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Totale Segnalazioni
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Tutte le segnalazioni
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Attesa</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.pending}
              </div>
              <p className="text-xs text-muted-foreground">
                Richiedono attenzione
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Corso</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Lavori in corso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risolte</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </div>
              <p className="text-xs text-muted-foreground">Completate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Segnalazioni per Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stato delle Segnalazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reports Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gestione Segnalazioni</CardTitle>
            <CardDescription>
              Visualizza e gestisci tutte le segnalazioni ricevute
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
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
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value as ReportStatus | "all",
                  }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtra per stato" />
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

              <Select
                value={filters.priority}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtra per priorità" />
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

            {/* Reports Table */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="font-medium text-lg">
                            {report.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge
                              className={`text-xs ${getStatusColor(
                                report.status
                              )} hover:${getStatusColor(report.status)}`}
                            >
                              {statusLabels[report.status]}
                            </Badge>
                            <Badge
                              className={`text-xs ${getPriorityColor(
                                report.priority
                              )} hover:${getPriorityColor(report.priority)}`}
                            >
                              {priorityLabels[report.priority]}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-2 line-clamp-2">
                          {report.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{report.location.address}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {report.submittedAt.toLocaleDateString("it-IT")}
                            </span>
                          </div>
                          <span>{categoryLabels[report.category]}</span>
                        </div>

                        {report.municipalNotes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                            <strong>Note:</strong> {report.municipalNotes}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedReport(report)}
                            >
                              Gestisci
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Gestisci Segnalazione</DialogTitle>
                              <DialogDescription>
                                Aggiorna lo stato e aggiungi note per la
                                segnalazione
                              </DialogDescription>
                            </DialogHeader>

                            {selectedReport && (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-medium mb-2">
                                    {selectedReport.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {selectedReport.description}
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Stato Attuale</Label>
                                    <Select
                                      defaultValue={selectedReport.status}
                                      onValueChange={(value) => {
                                        setSelectedReport({
                                          ...selectedReport,
                                          status: value as ReportStatus,
                                        });
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Object.entries(statusLabels).map(
                                          ([key, label]) => (
                                            <SelectItem key={key} value={key}>
                                              {label}
                                            </SelectItem>
                                          )
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label>Categoria</Label>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {categoryLabels[selectedReport.category]}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="notes">
                                    Note per il Cittadino
                                  </Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Aggiungi note o aggiornamenti per il cittadino..."
                                    defaultValue={
                                      selectedReport.municipalNotes || ""
                                    }
                                    onChange={(e) => {
                                      setSelectedReport({
                                        ...selectedReport,
                                        municipalNotes: e.target.value,
                                      });
                                    }}
                                  />
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button
                                    onClick={() => {
                                      if (selectedReport) {
                                        updateReportStatus(
                                          selectedReport.id,
                                          selectedReport.status,
                                          selectedReport.municipalNotes
                                        );
                                      }
                                    }}
                                  >
                                    Salva Modifiche
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2" />
                  <p>Nessuna segnalazione trovata</p>
                  <p className="text-sm">
                    Prova a modificare i filtri di ricerca
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
