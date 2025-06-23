"use client";

import { useState, createContext } from "react";

export const ServiceStationsContext = createContext("");

export default function ServiceStationsProvider({ children }) {
  const [serviceStationsList, setServiceStationsList] = useState([]);

  const fetchStationsList = () => {
    fetch("/api/zone");
  };

  return (
    <ServiceStationsContext.Provider
      value={{ serviceStationsList, setServiceStationsList }}
    >
      {children}
    </ServiceStationsContext.Provider>
  );
}
