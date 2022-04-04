import React, { useContext } from "react";

export type MapContent = {
  coordinates: [number, number];
  setCoordinates: (coords: [number, number]) => void;
};

export const MapContext = React.createContext<MapContent>({
  coordinates: [56.817076, 60.611855],
  setCoordinates: () => {},
});

export const useGlobalContext = () => useContext(MapContext);
