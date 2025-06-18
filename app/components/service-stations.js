"use client";

import { ServiceStationsContext } from "../contexts/service-stations-context";

export const ServiceStations = () => {
  const { serviceStationsList, setServiceStationsList } = useContext(
    ServiceStationsContext
  );
};
