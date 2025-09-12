"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priorityLabels } from "@/lib/mock-data";
import type { Report } from "@/lib/types";
import { getPriorityColor } from "@/lib/utils";
import dayjs from "dayjs";
import { Calendar, User, X } from "lucide-react";

interface ReportCardProps {
  report: Report;
  onClose: () => void;
}

export function ReportCard({ report, onClose }: ReportCardProps) {
  console.log({ report });

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">
              {report.title}
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            className={`text-xs ${getPriorityColor(
              report.severity
            )} hover:${getPriorityColor(report.severity)}`}
          >
            {priorityLabels[report.severity]}
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
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              Segnalato il {dayjs(report.created_at).format("DD/MM/YYYY")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{report.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
