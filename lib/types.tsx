export interface Report {
  id: string;
  title: string;
  description: string | null;
  lat: number;
  lng: number;
  severity: Priority;
  user_id: string;
  email: string;
  name: string;
  created_at: Date;
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
