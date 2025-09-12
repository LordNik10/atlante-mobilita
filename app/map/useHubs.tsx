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

  const getHubs = async () => {
    const res = await fetch("/api/hub/fetch");
    const data = await res.json();
    console.log({ data });
    setHubs(data);
  };

  return { hubs, getHubs };
};
