import { Report } from "@/lib/types";
import { useState } from "react";

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  const getReports = async () => {
    const res = await fetch("/api/report/fetch");
    const data = await res.json();
    console.log({ data });
    setReports(data);
    setFilteredReports(data);
  };

  return { reports, filteredReports, getReports, setFilteredReports };
};
