import type { Priority, ReportCategory, ReportStatus } from "./types";

export const categoryLabels: Record<ReportCategory, string> = {
  "sidewalk-damage": "Marciapiede danneggiato",
  "missing-bike-lane": "Pista ciclabile mancante",
  "disabled-parking-occupied": "Parcheggio disabili occupato",
  "traffic-light-issue": "Problema semaforo",
  "accessibility-barrier": "Barriera architettonica",
  "public-transport": "Trasporto pubblico",
  "road-damage": "Strada danneggiata",
  "improvement-suggestion": "Proposta di miglioramento",
  other: "Altro",
};

export const statusLabels: Record<ReportStatus, string> = {
  submitted: "Inviata",
  "under-review": "In valutazione",
  "in-progress": "In corso",
  resolved: "Risolta",
  rejected: "Respinta",
};

export const priorityLabels: Record<Priority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};
