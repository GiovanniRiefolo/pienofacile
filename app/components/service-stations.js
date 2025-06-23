"use client";

import { useState, useContext } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";

export const ServiceStations = () => {
  const { serviceStationsList, setServiceStationsList } = useContext(
    ServiceStationsContext
  );

  const getServiceStations = () => {
    fetch("api/zone", {
      method: "POST",
      body: JSON.stringify({
        points: [{ lat: 45.0703155, lng: 7.6868552 }],
        radius: 5,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200)
          setServiceStationsList(response.data.results);
      });
  };

  return (
    <>
      <button onClick={() => getServiceStations()}>cerca</button>
      <ul>
        {serviceStationsList &&
          serviceStationsList.map((station, index) => (
            <li key={index}>{station.name}</li>
          ))}
      </ul>
    </>
  );
};
