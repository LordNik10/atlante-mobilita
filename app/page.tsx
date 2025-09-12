import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  FileText,
  Shield,
  Accessibility,
  MessageSquare,
} from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { getUserInfoFromCookie } from "@/utils/supabase/server";

export default async function HomePage() {
  const user = await getUserInfoFromCookie();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Atlante Mobilità
              </h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/map">
                <Button variant="ghost">Mappa</Button>
              </Link>
              <UserAvatar name={user?.name} />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Piattaforma Civica per la Mobilità Urbana
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Costruiamo insieme una città più{" "}
            <span className="text-blue-600">accessibile</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-3xl mx-auto">
            Segnala barriere architettoniche, problemi di mobilità e proponi
            miglioramenti per rendere la tua città più inclusiva e sostenibile
            per tutti i cittadini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Esplora la Mappa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una piattaforma semplice e accessibile per migliorare la mobilità
              urbana attraverso la partecipazione attiva dei cittadini.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Segnala Problemi</CardTitle>
                <CardDescription>
                  Documenta barriere architettoniche, marciapiedi danneggiati,
                  strade dissestate e altri problemi di mobilità
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Geolocalizzazione</CardTitle>
                <CardDescription>
                  Ogni segnalazione è mappata con precisione per facilitare
                  l&apos;intervento delle autorità competenti
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Collaborazione</CardTitle>
                <CardDescription>
                  Cittadini e amministrazioni lavorano insieme per creare una
                  città più inclusiva e accessibile
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cosa Puoi Segnalare
            </h2>
            <p className="text-lg text-gray-600">
              Aiutaci a identificare e risolvere i problemi di mobilità nella
              tua città
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Accessibility className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Barriere Architettoniche</h3>
              <p className="text-sm text-gray-600">
                Ostacoli che limitano l&apos;accessibilità
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <MapPin className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Marciapiedi Danneggiati</h3>
              <p className="text-sm text-gray-600">
                Buche, crepe e superfici irregolari
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Shield className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold mb-2">Strade dissestate</h3>
              <p className="text-sm text-gray-600">
                Buche, crepe e superfici irregolari
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Proposte di Miglioramento</h3>
              <p className="text-sm text-gray-600">
                Idee per una mobilità più sostenibile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Inizia a Contribuire Oggi
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            La tua segnalazione può fare la differenza per rendere la città più
            accessibile a tutti
          </p>
          <Link href="/map">
            <Button size="lg" variant="secondary">
              Esplora Mappa
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">
                  Atlante della Mobilità Giusta
                </h3>
              </div>
              <p className="text-gray-400">
                Piattaforma civica per una mobilità urbana più inclusiva e
                sostenibile.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Collegamenti Utili</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/map" className="hover:text-white">
                    Mappa Interattiva
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Accessibilità</h4>
              <p className="text-gray-400 text-sm">
                Questa piattaforma è progettata per essere accessibile a tutti.
                Supportiamo screen reader e navigazione da tastiera.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Atlante della Mobilità Giusta. Tutti i diritti
              riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
