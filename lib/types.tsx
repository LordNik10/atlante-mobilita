export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos?: string[];
  submittedBy: string | null; // null for anonymous reports
  submittedAt: Date;
  updatedAt: Date;
  municipalNotes?: string;
  priority: Priority;
}

export type ReportCategory =
  | "sidewalk-damage"
  | "missing-bike-lane"
  | "disabled-parking-occupied"
  | "traffic-light-issue"
  | "accessibility-barrier"
  | "public-transport"
  | "road-damage"
  | "improvement-suggestion"
  | "other";

export type ReportStatus =
  | "submitted"
  | "under-review"
  | "in-progress"
  | "resolved"
  | "rejected";

export type Priority = "low" | "medium" | "high" | "urgent";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "citizen" | "municipal";
  createdAt: Date;
}

export interface Municipality {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}
