"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationPickerProps {
  location: Location;
  onLocationChange: (location: Location) => void;
}

export function LocationPicker({
  location,
  onLocationChange,
}: LocationPickerProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Simulate reverse geocoding
          const mockAddress = `Via Example ${Math.floor(
            Math.random() * 100
          )}, Milano`;

          onLocationChange({
            lat: latitude,
            lng: longitude,
            address: mockAddress,
          });

          setIsGettingLocation(false);
        },
        (error) => {
          console.error("[v0] Geolocation error:", error);
          setIsGettingLocation(false);
        }
      );
    } else {
      console.error("[v0] Geolocation not supported");
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Indirizzo *</Label>
        <div className="flex gap-2">
          <Input
            id="address"
            placeholder="es. Via Roma 15, Milano"
            value={location.address}
            onChange={(e) =>
              onLocationChange({ ...location, address: e.target.value })
            }
            required
          />
          <Button
            type="button"
            variant="outline"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Clicca l&apos;icona di navigazione per usare la tua posizione attuale
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border">
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Mappa Interattiva</p>
          <p className="text-xs">Clicca per selezionare la posizione esatta</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <Label className="text-xs text-gray-500">Latitudine</Label>
          <p className="font-mono">{location.lat.toFixed(6)}</p>
        </div>
        <div>
          <Label className="text-xs text-gray-500">Longitudine</Label>
          <p className="font-mono">{location.lng.toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
}
