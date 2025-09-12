"use client";

import { Hub } from "@/app/map/useHubs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getPriorityColor } from "@/lib/utils";
import { X } from "lucide-react";

interface ReportCardProps {
  hub: Hub;
  onClose: () => void;
}

export function HubCard({ hub, onClose }: ReportCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">{hub.name}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            className={`text-xs ${getPriorityColor(
              hub.services
            )} hover:${getPriorityColor(hub.services)}`}
          >
            {hub.services}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
