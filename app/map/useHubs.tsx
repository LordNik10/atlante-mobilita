import { useState } from "react";

export interface Hub {
  id: string;
  created_at: Date;
  lat: number;
  lng: number;
  name: string;
  services: string;
}

export const useHubs = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHubs = async () => {
    setIsLoading(true);
    const res = await fetch("/api/hub/fetch");
    const data = await res.json();
    console.log({ data });
    setHubs(data);
    setIsLoading(false);
  };

  return { hubs, getHubs, isLoading };
};
