"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, User, AlertCircle } from "lucide-react";
import type { Report } from "@/lib/types";
import { categoryLabels, statusLabels, priorityLabels } from "@/lib/mock-data";

interface ReportCardProps {
  report: Report;
  onClose: () => void;
}

export function ReportCard({ report, onClose }: ReportCardProps) {
  const getStatusColor = (status: string) => {
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
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">
              {report.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {categoryLabels[report.category]}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
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
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-1">Descrizione</h4>
          <p className="text-sm text-gray-600 text-pretty">
            {report.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{report.location.address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              Segnalato il {report.submittedAt.toLocaleDateString("it-IT")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {report.submittedBy
                ? "Utente registrato"
                : "Segnalazione anonima"}
            </span>
          </div>
        </div>

        {report.municipalNotes && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-blue-900 text-sm">
                  Note del Comune
                </h5>
                <p className="text-sm text-blue-800 mt-1">
                  {report.municipalNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {report.photos && report.photos.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Foto</h4>
            <div className="grid grid-cols-2 gap-2">
              {report.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
