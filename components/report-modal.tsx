"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ReportCategory } from "@/lib/types";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { user } from "@/app/sever-actions/user/getUserInfo";
import Link from "next/link";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation: {
    lat: number;
    lng: number;
  };
  user: user | null;
  onReportSubmitted?: () => void;
  getReports: () => void;
}

export function ReportModal({
  isOpen,
  onClose,
  initialLocation,
  onReportSubmitted,
  getReports,
  user,
}: ReportModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as ReportCategory | "",
    priority: "medium",
    location: {
      lat: initialLocation.lat || 45.4642,
      lng: initialLocation.lng || 9.19,
      address: "Posizione selezionata sulla mappa",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({
        ...prev,
        location: {
          lat: initialLocation.lat,
          lng: initialLocation.lng,
          address: "Posizione selezionata sulla mappa",
        },
      }));
    }
  }, [initialLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsSubmitting(true);

    try {
      const report = {
        title: formData.title,
        description: formData.description ?? "",
        priority: formData.priority as "low" | "medium" | "high" | "urgent",
        lat: formData.location.lat,
        lng: formData.location.lng,
      };

      await fetch("/api/report/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      await getReports();

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        location: {
          lat: initialLocation?.lat || 45.4642,
          lng: initialLocation?.lng || 9.19,
          address: "Posizione selezionata sulla mappa",
        },
      });

      onReportSubmitted?.();
      onClose();
    } catch (error) {
      console.error("Errore nell'invio della segnalazione:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="absolute z-999 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Nuova Segnalazione
          </DialogTitle>
        </DialogHeader>
        {!user ? (
          <Link href="/login" className="text-blue-600 hover:underline">
            Effettua il login per inviare una segnalazione
          </Link>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Display */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
                <MapPin className="w-4 h-4" />
                Posizione selezionata
              </div>
              <p className="text-sm text-blue-700">
                {formData.location.address}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Coordinate: {formData.location.lat.toFixed(6)},{" "}
                {formData.location.lng.toFixed(6)}
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Titolo della segnalazione *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Descrivi brevemente il problema"
                required
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priorità</Label>
              <div style={{ position: "relative" }}>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Bassa</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione dettagliata *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Fornisci una descrizione dettagliata del problema, inclusi eventuali rischi per la sicurezza"
                rows={4}
                required
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title}
                className="flex-1"
              >
                {isSubmitting ? "Invio in corso..." : "Invia Segnalazione"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
