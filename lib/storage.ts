import type { Report } from "./types";

const STORAGE_KEY = "mobility-atlas-reports";

export function getStoredReports(): Report[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const reports = JSON.parse(stored);
    // Convert date strings back to Date objects
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return reports.map((report: any) => ({
      ...report,
      submittedAt: new Date(report.submittedAt),
      updatedAt: new Date(report.updatedAt),
    }));
  } catch (error) {
    console.error("Error loading reports from storage:", error);
    return [];
  }
}

export function saveReports(reports: Report[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error("Error saving reports to storage:", error);
  }
}

export function addReport(
  report: Omit<Report, "id" | "submittedAt" | "updatedAt">
): Report {
  const newReport: Report = {
    ...report,
    id: Date.now().toString(),
    submittedAt: new Date(),
    updatedAt: new Date(),
  };

  const existingReports = getStoredReports();
  const updatedReports = [...existingReports, newReport];
  saveReports(updatedReports);

  return newReport;
}

export function updateReport(
  id: string,
  updates: Partial<Report>
): Report | null {
  const reports = getStoredReports();
  const reportIndex = reports.findIndex((r) => r.id === id);

  if (reportIndex === -1) return null;

  const updatedReport = {
    ...reports[reportIndex],
    ...updates,
    updatedAt: new Date(),
  };

  reports[reportIndex] = updatedReport;
  saveReports(reports);

  return updatedReport;
}
