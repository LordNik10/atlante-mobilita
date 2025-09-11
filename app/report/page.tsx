"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { ReportCategory, Priority } from "@/lib/types";
import { categoryLabels, priorityLabels } from "@/lib/mock-data";
import { addReport } from "@/lib/storage";
import { LocationPicker } from "@/components/location-picker";

export default function ReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as ReportCategory,
    priority: "medium" as Priority,
    location: {
      lat: 45.4642,
      lng: 9.19,
      address: "",
    },
    photos: [] as string[],
    isAnonymous: false,
    submitterName: "",
    submitterEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReport = addReport({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: "submitted",
        location: formData.location,
        photos: formData.photos,
        submittedBy: formData.isAnonymous ? null : formData.submitterEmail,
        priority: formData.priority,
        municipalNotes: undefined,
      });

      console.log("[v0] New report created:", newReport);
      setIsSubmitted(true);
    } catch (error) {
      console.error("[v0] Error submitting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">
              Segnalazione Inviata!
            </CardTitle>
            <CardDescription>
              La tua segnalazione è stata ricevuta e sarà esaminata dalle
              autorità competenti.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Riceverai aggiornamenti sullo stato della tua segnalazione via
              email.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/map">
                <Button className="w-full">Visualizza sulla Mappa</Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" className="w-full bg-transparent">
                  Fai un&apos;altra Segnalazione
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
                  Atlante della Mobilità Giusta
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Nuova Segnalazione
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Segnala un Problema di Mobilità
          </h1>
          <p className="text-lg text-gray-600">
            Aiutaci a migliorare l&apos;accessibilità della città segnalando
            barriere architettoniche e problemi di mobilità.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Base</CardTitle>
              <CardDescription>
                Descrivi il problema che hai riscontrato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo della Segnalazione *</Label>
                <Input
                  id="title"
                  placeholder="es. Marciapiede danneggiato in Via Roma"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value as ReportCategory,
                    }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priorità</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: value as Priority,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrizione Dettagliata *</Label>
                <Textarea
                  id="description"
                  placeholder="Descrivi il problema in dettaglio, inclusi eventuali rischi per la sicurezza..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Posizione</CardTitle>
              <CardDescription>
                Indica dove si trova il problema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LocationPicker
                location={formData.location}
                onLocationChange={(location) =>
                  setFormData((prev) => ({ ...prev, location }))
                }
              />
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Foto (Opzionale)</CardTitle>
              <CardDescription>
                Aggiungi foto per documentare il problema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Trascina le foto qui o clicca per selezionare
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG fino a 5MB ciascuna
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 bg-transparent"
                >
                  Seleziona File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Contatto</CardTitle>
              <CardDescription>
                Come possiamo contattarti per aggiornamenti (opzionale)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAnonymous: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Segnalazione anonima
                </Label>
              </div>

              {!formData.isAnonymous && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Il tuo nome"
                      value={formData.submitterName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          submitterName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="la-tua-email@esempio.it"
                      value={formData.submitterEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          submitterEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Invio in corso..." : "Invia Segnalazione"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
