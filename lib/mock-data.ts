import type { Report, ReportCategory, ReportStatus, Priority } from "./types";

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Marciapiede danneggiato in Via Roma",
    description:
      "Il marciapiede presenta una buca profonda che rende difficile il passaggio per persone con disabilità motorie e passeggini.",
    category: "sidewalk-damage",
    status: "submitted",
    location: {
      lat: 45.4642,
      lng: 9.19,
      address: "Via Roma 15, Milano",
    },
    photos: ["/damaged-sidewalk-with-pothole.jpg"],
    submittedBy: "user1",
    submittedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    priority: "high",
  },
  {
    id: "2",
    title: "Parcheggio disabili occupato",
    description:
      "Parcheggio riservato ai disabili costantemente occupato da veicoli non autorizzati.",
    category: "disabled-parking-occupied",
    status: "under-review",
    location: {
      lat: 45.4654,
      lng: 9.1859,
      address: "Piazza Duomo, Milano",
    },
    submittedBy: null, // anonymous report
    submittedAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    municipalNotes:
      "Segnalazione presa in carico, aumenteremo i controlli nella zona.",
    priority: "medium",
  },
  {
    id: "3",
    title: "Proposta pista ciclabile",
    description:
      "Sarebbe utile una pista ciclabile lungo Corso Buenos Aires per migliorare la mobilità sostenibile.",
    category: "improvement-suggestion",
    status: "in-progress",
    location: {
      lat: 45.4719,
      lng: 9.1951,
      address: "Corso Buenos Aires, Milano",
    },
    submittedBy: "user2",
    submittedAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-14"),
    municipalNotes:
      "Proposta interessante, stiamo valutando la fattibilità tecnica.",
    priority: "low",
  },
];

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
