"use client";

import { useState, createContext } from "react";

export const ServiceStationsContext = createContext("");

export default function ServiceStationsProvider({ children }) {
  const [serviceStationsList, setServiceStationsList] = useState([]);
  const [position, setPosition] = useState(null);

  const fetchStationsList = () => {
    fetch("/api/zone");
  };

  return (
    <ServiceStationsContext.Provider
      value={{ serviceStationsList, setServiceStationsList, position, setPosition }}
    >
      {children}
    </ServiceStationsContext.Provider>
  );
}
