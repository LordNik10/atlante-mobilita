"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  ArrowLeft,
  FileText,
  Calendar,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Report } from "@/lib/types";
import { categoryLabels, statusLabels, mockReports } from "@/lib/mock-data";
import { getStoredReports } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const [userReports, setUserReports] = useState<Report[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Load user's reports
    const storedReports = getStoredReports();
    const allReports = [...mockReports, ...storedReports];
    const userReports = allReports.filter(
      (report) => report.submittedBy === parsedUser.email
    );
    setUserReports(userReports);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                  Il Mio Profilo
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/report">
                <Button>Nuova Segnalazione</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Profilo Utente</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {user.role === "municipal"
                      ? "Amministrazione"
                      : "Cittadino"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Segnalazioni totali</span>
                    <span className="font-medium">{userReports.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Risolte</span>
                    <span className="font-medium text-green-600">
                      {
                        userReports.filter((r) => r.status === "resolved")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">In corso</span>
                    <span className="font-medium text-orange-600">
                      {
                        userReports.filter((r) => r.status === "in-progress")
                          .length
                      }
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Impostazioni Account
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Reports */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Le Mie Segnalazioni
                </CardTitle>
                <CardDescription>
                  Tutte le segnalazioni che hai inviato
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userReports.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2" />
                    <p>Non hai ancora inviato segnalazioni</p>
                    <p className="text-sm mb-4">
                      Inizia a contribuire al miglioramento della città
                    </p>
                    <Link href="/report">
                      <Button>Fai la Tua Prima Segnalazione</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userReports.map((report) => (
                      <Card
                        key={report.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-2">
                                <h3 className="font-medium">{report.title}</h3>
                                <Badge
                                  className={`text-xs ${getStatusColor(
                                    report.status
                                  )} hover:${getStatusColor(report.status)}`}
                                >
                                  {statusLabels[report.status]}
                                </Badge>
                              </div>

                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {report.description}
                              </p>

                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{report.location.address}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    {report.submittedAt.toLocaleDateString(
                                      "it-IT"
                                    )}
                                  </span>
                                </div>
                                <span>{categoryLabels[report.category]}</span>
                              </div>

                              {report.municipalNotes && (
                                <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                                  <strong>Aggiornamento del Comune:</strong>{" "}
                                  {report.municipalNotes}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
