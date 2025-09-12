import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: (coords: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      // Quando la mappa viene cliccata, l'evento (e) contiene le coordinate
      const { lat, lng } = e.latlng;
      // Richiama la funzione passata come prop con le coordinate
      onMapClick([lat, lng]);
    },
  });

  return null; // Questo componente non renderizza nulla, serve solo per gestire gli eventi
};

export default MapClickHandler;
