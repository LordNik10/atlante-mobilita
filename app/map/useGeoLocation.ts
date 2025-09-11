import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] = useState<{
    loaded: boolean;
    coordinates: { lat: number | null; lng: number | null };
    error: string | null;
  } | null>({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
  });

  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error: error.message,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({ message: "Geolocation non supportata." });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return { location };
};
