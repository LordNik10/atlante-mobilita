import { Report } from "@/lib/types";
import { useState } from "react";

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getReports = async () => {
    setIsLoading(true);
    const res = await fetch("/api/report/fetch");
    const data = await res.json();
    console.log({ data });
    setReports(data);
    setFilteredReports(data);
    setIsLoading(false);
  };

  return {
    reports,
    filteredReports,
    getReports,
    setFilteredReports,
    isLoading,
  };
};
